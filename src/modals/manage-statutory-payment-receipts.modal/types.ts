import { StatutoryPayment } from "../../helpers/api/modules/statutory-payments";

export type Receipt = {
  url: string;
  type: "image" | "pdf";
  file?: File;
};

export type ManageStatutoryPaymentReceiptsModalProps = {
  statutoryPayment: StatutoryPayment;
};

export type ReceiptUploadState = {
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
};
