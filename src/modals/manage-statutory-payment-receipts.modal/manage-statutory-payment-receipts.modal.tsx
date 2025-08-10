import NiceModal from "@ebay/nice-modal-react";
import { ManageStatutoryPaymentReceiptsModalProps } from "./types";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";
import { useManageStatutoryPaymentReceipts } from "./hooks";
import { AppButton } from "../../components/button.component/button.component";
import { IF } from "../../components/if.component/if.component";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Alert,
  Grid,
  Card,
  CardActions,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Description as PdfIcon,
  //   Image as ImageIcon,
  FileDownload as DownloadIcon,
} from "@mui/icons-material";

export const ManageStatutoryPaymentReceiptsModal = NiceModal.create(
  (payload: ManageStatutoryPaymentReceiptsModalProps) => {
    const {
      receipts,
      uploadState,
      deleteReceipt,
      openReceipt,
      handleFileUpload,
      handleDragOver,
      handleDrop,
      handleSaveChanges,
      isCompleted,
      toggleCompleted,
    } = useManageStatutoryPaymentReceipts(payload);

    return (
      <ModalLayout title="Manage Statutory Payment Receipts">
        {(modal) => (
          <Box sx={{ p: 3, minHeight: "100vh" }}>
            {/* Statutory Payment Info */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" gutterBottom>
                {payload.statutoryPayment.statutoryType} payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amount: ₦{" "}
                {payload.statutoryPayment.totalAmount?.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Company: {payload.statutoryPayment.company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {payload.statutoryPayment.status}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCompleted}
                    onChange={toggleCompleted}
                    name="isCompleted"
                    color="primary"
                  />
                }
                label="Mark as completed"
              />
            </Paper>

            {/* Upload Section */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                border: "2px dashed",
                borderColor: "primary.main",
                bgcolor: "primary.50",
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "primary.100",
                },
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e.target.files)}
              />

              <UploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Upload Receipts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drag and drop files here or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: PDF, JPG, JPEG, PNG
              </Typography>
            </Paper>

            {/* Upload Progress */}
            <IF condition={uploadState.isUploading}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading receipts... {Math.round(uploadState.uploadProgress)}
                  %
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={uploadState.uploadProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Paper>
            </IF>

            {/* Upload Error */}
            <IF condition={!!uploadState.error}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {uploadState.error}
              </Alert>
            </IF>

            {/* Receipts List */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Receipts ({receipts.length})
              </Typography>

              <IF condition={receipts.length === 0}>
                <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
                  <Typography variant="body1" color="text.secondary">
                    No receipts uploaded yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload receipts to keep track of your statutory payments
                  </Typography>
                </Paper>
              </IF>

              <IF condition={receipts.length > 0}>
                <Grid container spacing={2}>
                  {receipts.map((receipt) => (
                    <Grid item xs={12} sm={12} md={6} key={receipt.url}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ position: "relative" }}>
                          {receipt.type === "image" ? (
                            <Box
                              component="img"
                              src={receipt.url}
                              alt={receipt.url}
                              sx={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                                bgcolor: "grey.200",
                              }}
                            />
                          ) : (
                            <PdfIcon sx={{ width: "100%", height: 150 }} />
                          )}
                        </Box>

                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <FlexBox
                            gap={1}
                            justifyContent="space-between"
                            width="100%"
                          >
                            <IconButton
                              size="small"
                              onClick={() => openReceipt(receipt)}
                              color="primary"
                            >
                              <ViewIcon />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() => window.open(receipt.url, "_blank")}
                              color="secondary"
                            >
                              <DownloadIcon />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() => deleteReceipt(receipt.url)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </FlexBox>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </IF>
            </Box>

            {/* Action Buttons */}
            <Divider sx={{ my: 3 }} />
            <FlexBox gap={10} justifyContent="flex-end">
              <AppButton
                variant="contained"
                onClick={handleSaveChanges}
                disabled={uploadState.isUploading}
                loading={uploadState.isUploading}
              >
                Save Changes
              </AppButton>
            </FlexBox>
          </Box>
        )}
      </ModalLayout>
    );
  }
);
