import { AxiosInstance } from "axios";
import { User } from "../../../../types";
import { ApiResponse, ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetUsersQueryParams, GetUsersResponse } from "./types";

export class UserModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/users");
  }

  async getDetails() {
    const { data } = await this.$get<ApiResponse<User>>("/me");

    return data;
  }
}

export class AppUserModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/users");
  }

  getUsers(params: GetUsersQueryParams) {
    return this.$get<ApiResponseWithMeta<GetUsersResponse[]>>("/", { params });
  }
}
