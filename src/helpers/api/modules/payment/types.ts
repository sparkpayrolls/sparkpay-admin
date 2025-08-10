export type UpdateDetailsAndRetryTransfer = {
  transferId: string;
  bankId: string;
  accountNumber: string;
};

export type RetryFailedTransfersPayload = {
  transfers: UpdateDetailsAndRetryTransfer[];
};
