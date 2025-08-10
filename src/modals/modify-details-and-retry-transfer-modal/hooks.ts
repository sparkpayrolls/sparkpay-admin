import get from "lodash.get";
import { Transfer } from "../../helpers/api/modules/payout/type";
import { ModifyDetailsAndRetryTransferModalProps } from "./types";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { FormikHelpers, FormikProps } from "formik";
import { $api } from "../../helpers/api/api";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { useModal } from "@ebay/nice-modal-react";

export const getAccountNameFromTransfer = (transfer: Transfer) => {
  return (
    get(transfer.meta, "webhook.data.recipient.details.account_name") ||
    get(
      transfer.providerResponse,
      "successEventPayload.data.recipient.details.account_name"
    ) ||
    get(
      transfer.meta,
      "providerResponse.providerResponse.beneficiary.account_name"
    ) ||
    get(
      transfer.meta,
      "webhook.providerPayload.data.recipient.details.account_name"
    ) ||
    transfer.accountName ||
    "--- ---"
  );
};

export const useModifyDetailsAndRetryTransfer = (
  payload: ModifyDetailsAndRetryTransferModalProps
) => {
  const [accountName, setAccountName] = useState<string>("");
  const modal = useModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAccountName = useCallback(
    debounce((props?: FormikProps<typeof initialValues>) => {
      if (
        !props ||
        (payload.transfer.accountNumber === props?.values?.accountNumber &&
          payload.transfer.bank?.id === props?.values?.bank)
      ) {
        setAccountName(getAccountNameFromTransfer(payload.transfer));
      } else if (props.values.accountNumber && props.values.bank) {
        setAccountName("");

        $api.payout
          .validateAccountDetails({
            accountNumber: props.values.accountNumber,
            bank: props.values.bank,
          })
          .then((res) => {
            setAccountName(res.data.accountName);
          })
          .catch((err) => {
            setAccountName("invalid account details");
          });
      }
    }, 1000),
    [payload.transfer]
  );

  useEffect(() => {
    getAccountName();
  }, [getAccountName, payload.transfer]);

  const handleChangeWrapper = (
    handleChange: (e: unknown) => void,
    props: FormikProps<typeof initialValues>
  ) => {
    return (e: unknown) => {
      const event = e as { target: Record<string, unknown> };
      handleChange(e);
      getAccountName({
        ...props,
        values: {
          ...props.values,
          [event.target.name as string]: event.target.value,
        },
      });
    };
  };

  const handleSubmit = (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    if (
      initialValues.accountNumber === values.accountNumber ||
      initialValues.bank === values.bank ||
      !accountName ||
      accountName === "invalid account details"
    ) {
      helpers.setSubmitting(false);
      return;
    }

    helpers.setSubmitting(true);

    $api.payment
      .updateDetailsAndRetryTransfer({
        transfers: [
          {
            transferId: payload.transfer.id,
            bankId: values.bank || "",
            accountNumber: values.accountNumber || "",
          },
        ],
      })
      .then(() => {
        snackbar({
          open: true,
          message: "Transfer details updated and retry initiated",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });

        modal.resolve();
        setTimeout(modal.hide.bind(modal), 5);
        setTimeout(modal.remove.bind(modal), 200);
      })
      .catch((err) => {
        snackbar({
          open: true,
          message: `Error updating transfer details and retrying - ${err.message}`,

          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  const initialValues = {
    accountNumber: payload.transfer?.accountNumber,
    bank: payload.transfer?.bank?.id,
  };

  return {
    banks: payload.banks,
    initialValues,
    accountName,
    getAccountName,
    handleChangeWrapper,
    handleSubmit,
  };
};
