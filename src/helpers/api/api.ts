import axios from "axios";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../state/hooks";
import { logOut } from "../../state/reducers/user/user.reducer";
import { config } from "../config";
import { AUTH_TOKEN } from "../constants";
import { AuthModule } from "./modules/auth/auth.module";
import { PayrollModule } from "./modules/payroll/payroll.module";
import { UserModule } from "./modules/user/user.module";

export class $api {
  static registerInterceptors(dispatch: ReturnType<typeof useAppDispatch>) {
    const authToken = Cookies.get(AUTH_TOKEN);
    $api.$axios.interceptors.request.use((config) => {
      return {
        ...config,
        headers: {
          ...(config?.headers || {}),
          Authorization: `Bearer ${authToken}`,
        },
      };
    });
    $api.$axios.interceptors.response.use(
      (res) => res,
      (error) => {
        switch (error.response?.status) {
          case 401: {
            logOut(dispatch);
            break;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  static $axios = axios.create({ baseURL: config().apiUrl });
  static payroll = new PayrollModule($api.$axios);
  static auth = new AuthModule($api.$axios);
  static user = new UserModule($api.$axios);
}
