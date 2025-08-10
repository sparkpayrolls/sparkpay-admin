import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import {
  GetStatutoryPaymentsQuery,
  StatutoryPayment,
  UpdateStatutoryPaymentPayload,
} from "./types";

export class StatutoryPaymentsModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/statutory");
  }

  getStatutoryPayments(params?: GetStatutoryPaymentsQuery) {
    return this.$get<ApiResponseWithMeta<StatutoryPayment[]>>("/payments", {
      params,
    });
  }

  retryTransferSuccessProcess(transferId: string) {
    return this.$post<ApiResponseWithMeta<StatutoryPayment>>(
      `/payments/retry-transfer-success/${transferId}`
    );
  }

  updateStatutoryPayment(id: string, payload: UpdateStatutoryPaymentPayload) {
    return this.$put<ApiResponseWithMeta<StatutoryPayment>>(
      `/payments/${id}`,
      payload
    );
  }
}
