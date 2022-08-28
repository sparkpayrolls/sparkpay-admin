import axios from "axios";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../state/hooks";
import { logOut } from "../../state/reducers/user/user.reducer";
import { config } from "../config";
import { AUTH_TOKEN } from "../constants";
import { AuthModule } from "./modules/auth/auth.module";
import { PayoutModule } from "./modules/payout/payout.module";
import { PayrollModule } from "./modules/payroll/payroll.module";
import { AppUserModule, UserModule } from "./modules/user/user.module";

let authToken: string;
export class $api {
  static registerInterceptors(dispatch: ReturnType<typeof useAppDispatch>) {
    authToken = Cookies.get(AUTH_TOKEN) as string;
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
  static payout = new PayoutModule($api.$axios);
  static appUser = new AppUserModule($api.$axios);
}
