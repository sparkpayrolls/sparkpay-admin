import { AxiosInstance } from "axios";
import { BaseModule } from "../base/base.module";

export class PaymentModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payments");
  }

  async retryFailedTransfers(transferIds?: string[]) {
    await this.$get("/retry-failed-transfers", {
      params: { transferIds },
    });
  }
}
