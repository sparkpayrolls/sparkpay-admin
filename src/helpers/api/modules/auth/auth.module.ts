import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types";
import { BaseModule } from "../base/base.module";
import { LoggedInUser, LoginPayload } from "./types";

export class AuthModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/auth");
  }

  async login(payload: LoginPayload) {
    const { data } = await this.$post<ApiResponse<LoggedInUser>>(
      "/app-admin-login",
      payload
    );

    return data;
  }
}
