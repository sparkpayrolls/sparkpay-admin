import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetCompaniesQueryParams, GetCompaniesResponse } from "./types";

export class CompanyModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/companies");
  }

  deleteCompanies(companyId: string | string[]) {
    return this.$delete("/", null, {
      params: {
        companyId,
      },
    });
  }

  getCompanies(params: GetCompaniesQueryParams) {
    return this.$get<ApiResponseWithMeta<GetCompaniesResponse[]>>("/", {
      params,
    });
  }
}
