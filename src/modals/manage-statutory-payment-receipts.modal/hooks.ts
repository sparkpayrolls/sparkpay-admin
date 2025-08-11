import { useState, useCallback, useEffect } from "react";
import { useModal } from "@ebay/nice-modal-react";
import {
  ManageStatutoryPaymentReceiptsModalProps,
  Receipt,
  ReceiptUploadState,
} from "./types";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { StatutoryPayment } from "../../helpers/api/modules/statutory-payments";
import { $api } from "../../helpers/api/api";

// Mock receipts data - in real app, this would come from API
const generateMockReceipts = (
  statutoryPayment: StatutoryPayment
): Receipt[] => {
  return (
    statutoryPayment.receipts?.map((receipt) => ({
      url: receipt,
      type: receipt.split(".").pop()?.toLowerCase() === "pdf" ? "pdf" : "image",
      needsUploading: false,
    })) || []
  );
};

const readFileAsBase64 = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

export const useManageStatutoryPaymentReceipts = (
  payload: ManageStatutoryPaymentReceiptsModalProps
) => {
  const modal = useModal();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [uploadState, setUploadState] = useState<ReceiptUploadState>({
    isUploading: false,
    uploadProgress: 0,
    error: null,
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Init state from payload
  useEffect(() => {
    setReceipts(generateMockReceipts(payload.statutoryPayment));
    setIsCompleted(payload.statutoryPayment.status === "completed");
  }, [payload.statutoryPayment]);

  const deleteReceipt = useCallback((receiptUrl: string) => {
    setReceipts((prev) => prev.filter((receipt) => receipt.url !== receiptUrl));
    snackbar({
      open: true,
      message: "Receipt deleted successfully",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  }, []);

  const openReceipt = useCallback((receipt: Receipt) => {
    window.open(receipt.url, "_blank");
  }, []);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadState((prev) => ({ ...prev, isUploading: true, error: null }));

    // Simulate file upload process
    const uploadPromises = Array.from(files).map((file, index) => {
      return new Promise<Receipt>((resolve) => {
        const progress = (index + 1) * (100 / files.length);
        setUploadState((prev) => ({ ...prev, uploadProgress: progress }));

        // Simulate upload delay
        setTimeout(() => {
          const newReceipt: Receipt = {
            url: URL.createObjectURL(file),
            type: file.type.includes("pdf") ? "pdf" : "image",
            file: file as File,
          };
          resolve(newReceipt);
        }, 1000 + index * 500);
      });
    });

    Promise.all(uploadPromises)
      .then((newReceipts) => {
        setReceipts((prev) => [...prev, ...newReceipts]);
        setUploadState((prev) => ({
          ...prev,
          isUploading: false,
          uploadProgress: 0,
        }));
        snackbar({
          open: true,
          message: `${files.length} receipt(s) uploaded successfully`,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      })
      .catch((error) => {
        setUploadState((prev) => ({
          ...prev,
          isUploading: false,
          error: error.message,
        }));
        snackbar({
          open: true,
          message: `Upload failed: ${error.message}`,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handleSaveChanges = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const filesKeyedByUrl = await receipts
        .filter((receipt) => receipt.file)
        .reduce(async (acc, receipt) => {
          const awaitedAcc = await acc;

          const file = await readFileAsBase64(receipt.file as File);

          const {
            data: { url },
          } = await $api.files.uploadFile({
            filename: receipt.file?.name || "",
            data: file,
          });

          return {
            ...awaitedAcc,
            [receipt.url]: url,
          };
        }, Promise.resolve({} as Record<string, string>));

      $api.statutoryPayments.updateStatutoryPayment(
        payload.statutoryPayment.id,
        {
          status: isCompleted ? "completed" : "processing",
          receipts: receipts.map(
            (receipt) => filesKeyedByUrl[receipt.url] || receipt.url
          ),
        }
      );

      // In real app, this would save to API
      snackbar({
        open: true,
        message: "Receipts updated successfully",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });

      modal.resolve();
      setTimeout(modal.hide.bind(modal), 5);
      setTimeout(modal.remove.bind(modal), 200);
    } catch (error) {
      snackbar({
        open: true,
        message: `Failed to update receipts: ${error}`,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    } finally {
      setIsSaving(false);
    }
  }, [isCompleted, modal, payload.statutoryPayment.id, receipts, isSaving]);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  return {
    receipts,
    uploadState,
    deleteReceipt,
    openReceipt,
    handleFileUpload,
    handleDragOver,
    handleDrop,
    handleSaveChanges,
    formatFileSize,
    isCompleted,
    toggleCompleted: () => setIsCompleted((prev) => !prev),
    isSaving,
  };
};
