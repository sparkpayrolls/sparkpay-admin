import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetBanksQuery, Bank } from "./types";

export class BanksModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/payouts/6151053e38bc69b9207a53d5/banks");
  }

  getBanks(params?: GetBanksQuery) {
    return this.$get<ApiResponseWithMeta<Bank[]>>("", { params });
  }
}
