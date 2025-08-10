import NiceModal from "@ebay/nice-modal-react";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";
import { Formik } from "formik";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import { AppTextField } from "../../components/text-field.component/text-field.component";
import { AppButton } from "../../components/button.component/button.component";
import { SearchableSelect } from "../../components/searchable-select.component";
import { ModifyDetailsAndRetryTransferModalProps } from "./types";
import { useModifyDetailsAndRetryTransfer } from "./hooks";

export const ModifyDetailsAndRetryTransferModal = NiceModal.create(
  (payload: ModifyDetailsAndRetryTransferModalProps) => {
    const {
      banks,
      initialValues,
      accountName,
      handleChangeWrapper,
      handleSubmit,
    } = useModifyDetailsAndRetryTransfer(payload);

    return (
      <ModalLayout title="Modify Details and Retry Transfer">
        {(modal) => {
          return (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(props) => {
                const {
                  isSubmitting,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;

                const loading = isSubmitting || !accountName;

                const shouldDisable =
                  loading || accountName === "invalid account details";

                return (
                  <form onSubmit={handleSubmit}>
                    <FlexBox.Column gap={4}>
                      <AppTextField
                        name="accountNumber"
                        label="Account Number"
                        placeholder="Account Number"
                        value={values.accountNumber}
                        onChange={handleChangeWrapper(handleChange, props)}
                        onBlur={handleBlur}
                        helperText={accountName}
                        error={accountName === "invalid account details"}
                      />

                      <SearchableSelect
                        label="Bank"
                        placeholder="Select a bank"
                        name="bank"
                        options={banks}
                        searchPlaceholder="Search banks..."
                        noOptionsText="No banks found"
                        value={values.bank}
                        onChange={handleChangeWrapper(handleChange, props)}
                      />

                      <AppButton
                        type="submit"
                        variant="contained"
                        disableElevation
                        loading={loading}
                        disabled={shouldDisable}
                      >
                        Modify Details and Retry Transfer
                      </AppButton>
                    </FlexBox.Column>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </ModalLayout>
    );
  }
);
