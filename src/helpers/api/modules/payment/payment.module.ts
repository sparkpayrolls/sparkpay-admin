import { AxiosInstance } from "axios";
import { BaseModule } from "../base/base.module";
import { RetryFailedTransfersPayload } from "./types";

export class PaymentModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payments");
  }

  async retryFailedTransfers(transferIds?: string[]) {
    await this.$get("/retry-failed-transfers", {
      params: { transferIds },
    });
  }

  async updateDetailsAndRetryTransfer(payload: RetryFailedTransfersPayload) {
    await this.$post("/update-details-and-retry-transfer", payload);
  }
}
