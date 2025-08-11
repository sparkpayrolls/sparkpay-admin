import { AxiosInstance } from "axios";
import { BaseModule } from "../base/base.module";
import { FundCompanyWalletPayload } from "./types";

export class CompanyWalletModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/company-wallets");
  }

  fundCompanyWallet(payload: FundCompanyWalletPayload) {
    return this.$post("/fund", payload);
  }
}
