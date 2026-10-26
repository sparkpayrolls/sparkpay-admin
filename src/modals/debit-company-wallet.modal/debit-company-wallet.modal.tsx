import NiceModal from "@ebay/nice-modal-react";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";
import { DebitCompanyWalletModalProps } from "./types";
import { AppButton } from "../../components/button.component/button.component";
import { AppTextField } from "../../components/text-field.component/text-field.component";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import { Box, Typography, Paper, Divider, Alert } from "@mui/material";
import { useState } from "react";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { $api } from "../../helpers/api/api";

export const DebitCompanyWalletModal = NiceModal.create(
  (props: DebitCompanyWalletModalProps) => {
    const [amount, setAmount] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debitAmount = parseFloat(amount) || 0;

    const handleSubmit = async (modal: any) => {
      if (!amount || debitAmount <= 0) {
        setError("Please enter a valid amount greater than 0");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        await $api.companyWallet.debitCompanyWallet({
          companyId: props.companyId,
          amount: debitAmount,
        });

        snackbar({
          open: true,
          message: `Successfully debited ${
            props.companyName
          } wallet with ₦${debitAmount.toLocaleString()}`,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });

        modal.resolve();
        setTimeout(modal.hide.bind(modal), 5);
        setTimeout(modal.remove.bind(modal), 200);
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Failed to debit wallet. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value) || value === "") {
        setAmount(value);
        setError(null);
      }
    };

    return (
      <ModalLayout title="Debit Company Wallet">
        {(modal) => (
          <Box sx={{ p: 3, minHeight: "60vh" }}>
            <Paper sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" gutterBottom>
                Company Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> {props.companyName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Current Balance:</strong> ₦
                {props.companyWalletBalance.toLocaleString()}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Debit Amount
              </Typography>

              <AppTextField
                fullWidth
                label="Amount (₦)"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount to debit"
                error={!!error}
                helperText={
                  error ||
                  "Enter the amount you want to remove from the company wallet"
                }
                sx={{ mb: 3 }}
                disabled={isSubmitting}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                New balance after debit: ₦
                {(props.companyWalletBalance - debitAmount).toLocaleString()}
              </Typography>
            </Paper>

            <Divider sx={{ my: 3 }} />
            <FlexBox gap={2} justifyContent="flex-end">
              <AppButton
                variant="contained"
                onClick={() => handleSubmit(modal)}
                disabled={!amount || debitAmount <= 0 || isSubmitting}
                loading={isSubmitting}
              >
                Debit Wallet
              </AppButton>
            </FlexBox>
          </Box>
        )}
      </ModalLayout>
    );
  }
);
