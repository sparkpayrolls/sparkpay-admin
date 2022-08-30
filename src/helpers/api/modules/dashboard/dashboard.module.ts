import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetDataResponse } from "./types";

export class DashboardModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/dashboards");
  }

  async getData() {
    const { data } = await this.$get<ApiResponse<GetDataResponse>>("/data");

    return data;
  }
}
