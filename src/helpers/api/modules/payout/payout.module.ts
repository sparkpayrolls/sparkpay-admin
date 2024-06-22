import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetTransfersQuery, Transfer } from "./type";

export class PayoutModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payouts");
  }

  getTransfers(params: GetTransfersQuery) {
    return this.$get<ApiResponseWithMeta<Transfer[]>>("", { params });
  }
}
