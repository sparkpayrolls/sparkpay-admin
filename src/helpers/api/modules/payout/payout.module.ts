import { AxiosInstance } from "axios";
import { ApiResponse, ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import {
  GetTransfersQuery,
  Transfer,
  ValidateAccountDetailsPayload,
} from "./type";

export class PayoutModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payouts");
  }

  getTransfers(params: GetTransfersQuery) {
    return this.$get<ApiResponseWithMeta<Transfer[]>>("", { params });
  }

  validateAccountDetails(payload: ValidateAccountDetailsPayload) {
    return this.$post<ApiResponse<{ accountName: string }>>("/validate", {
      methodId: "62961857e46ff1afcdad03d5",
      meta: {
        bankId: payload.bank,
        accountNumber: payload.accountNumber,
      },
    });
  }
}
