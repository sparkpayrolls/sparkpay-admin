import { AxiosInstance } from "axios";
import { ApiResponse, ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { CreateSignupInviteToken, LoggedInUser, LoginPayload } from "./types";
import { AuthToken } from "../../../../types";

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

export class AdminAuthModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/admin/auth");
  }

  async getSignupInviteTokens(params: unknown) {
    return this.$get<ApiResponseWithMeta<AuthToken[]>>("/signup-invites", {
      params,
    });
  }

  async createSignupInviteToken(payload: CreateSignupInviteToken) {
    return this.$post<ApiResponse<AuthToken>>("/signup-invites", payload);
  }
}
