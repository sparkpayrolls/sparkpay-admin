import { AxiosInstance } from "axios";
import { User } from "../../../../types";
import { ApiResponse } from "../../types";
import { BaseModule } from "../base/base.module";

export class UserModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/users");
  }

  async getDetails() {
    const { data } = await this.$get<ApiResponse<User>>("/me");

    return data;
  }
}
