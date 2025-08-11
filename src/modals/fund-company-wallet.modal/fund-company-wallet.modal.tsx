import NiceModal from "@ebay/nice-modal-react";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";
import { FundCompanyWalletModalProps } from "./types";
import { AppButton } from "../../components/button.component/button.component";
import { AppTextField } from "../../components/text-field.component/text-field.component";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import { Box, Typography, Paper, Divider, Alert } from "@mui/material";
import { useState } from "react";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { $api } from "../../helpers/api/api";

export const FundCompanyWalletModal = NiceModal.create(
  (props: FundCompanyWalletModalProps) => {
    const [amount, setAmount] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (modal: any) => {
      if (!amount || parseFloat(amount) <= 0) {
        setError("Please enter a valid amount greater than 0");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        await $api.companyWallet.fundCompanyWallet({
          companyId: props.companyId,
          amount: parseFloat(amount),
        });

        snackbar({
          open: true,
          message: `Successfully funded ${
            props.companyName
          } wallet with ₦${parseFloat(amount).toLocaleString()}`,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });

        modal.resolve();
        setTimeout(modal.hide.bind(modal), 5);
        setTimeout(modal.remove.bind(modal), 200);
      } catch (error) {
        setError("Failed to fund wallet. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Only allow numbers and decimal points
      if (/^\d*\.?\d*$/.test(value) || value === "") {
        setAmount(value);
        setError(null);
      }
    };

    return (
      <ModalLayout title="Fund Company Wallet">
        {(modal) => (
          <Box sx={{ p: 3, minHeight: "60vh" }}>
            {/* Company Information */}
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

            {/* Funding Form */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Funding Amount
              </Typography>

              <AppTextField
                fullWidth
                label="Amount (₦)"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount to fund"
                error={!!error}
                helperText={
                  error ||
                  "Enter the amount you want to add to the company wallet"
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
                New balance after funding: ₦
                {(
                  props.companyWalletBalance + (parseFloat(amount) || 0)
                ).toLocaleString()}
              </Typography>
            </Paper>

            {/* Action Buttons */}
            <Divider sx={{ my: 3 }} />
            <FlexBox gap={2} justifyContent="flex-end">
              <AppButton
                variant="contained"
                onClick={() => handleSubmit(modal)}
                disabled={!amount || parseFloat(amount) <= 0 || isSubmitting}
                loading={isSubmitting}
              >
                Fund Wallet
              </AppButton>
            </FlexBox>
          </Box>
        )}
      </ModalLayout>
    );
  }
);
