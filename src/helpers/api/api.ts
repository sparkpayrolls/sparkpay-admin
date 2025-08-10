import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { useAppDispatch } from "../../state/hooks";
import { logOut } from "../../state/reducers/user/user.reducer";
import { config } from "../config";
import { AUTH_DETAILS, AUTH_TOKEN } from "../constants";
import { AdminAuthModule, AuthModule } from "./modules/auth/auth.module";
import { AuthDetails } from "./modules/auth/types";
import { BanksModule } from "./modules/banks/banks.module";
import { CompanyModule } from "./modules/company/company.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { PayoutModule } from "./modules/payout/payout.module";
import { PayrollModule } from "./modules/payroll/payroll.module";
import { AppUserModule, UserModule } from "./modules/user/user.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { StatutoryPaymentsModule } from "./modules/statutory-payments/statutory-payments.module";
import { FilesModule } from "./modules/files";

let authToken: string;
let authDetails: AuthDetails;
let tokenInterceptor: number;
let authInterceptor: number;
export class $api {
  static registerInterceptors(dispatch: ReturnType<typeof useAppDispatch>) {
    authToken = Cookies.get(AUTH_TOKEN) as string;
    authDetails = JSON.parse(Cookies.get(AUTH_DETAILS) || '""');

    $api.$axios.interceptors.request.eject(tokenInterceptor);
    $api.$axios.interceptors.response.eject(authInterceptor);

    tokenInterceptor = $api.$axios.interceptors.request.use(async (_config) => {
      if (
        moment(authDetails.accessTokenExpires).isBefore(moment()) &&
        moment(authDetails.refreshTokenExpires).isAfter(moment())
      ) {
        const res = await axios({
          baseURL: config().apiUrl,
          url: "/auth/tokens",
          params: { refreshToken: authDetails.refreshToken },
        }).catch(() => {
          /** invalid token */
        });
        if (res && res.data && res.data.data) {
          authDetails = res.data.data;
          authToken = authDetails.accessToken;
          Cookies.set(AUTH_TOKEN, authToken);
          Cookies.set(AUTH_DETAILS, JSON.stringify(authDetails));
        }
      }

      return {
        ..._config,
        headers: {
          ...(_config?.headers || {}),
          Authorization: `Bearer ${authToken}`,
        },
      };
    });

    authInterceptor = $api.$axios.interceptors.response.use(
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
  static banks = new BanksModule($api.$axios);
  static user = new UserModule($api.$axios);
  static payment = new PaymentModule($api.$axios);
  static payout = new PayoutModule($api.$axios);
  static appUser = new AppUserModule($api.$axios);
  static company = new CompanyModule($api.$axios);
  static dashboard = new DashboardModule($api.$axios);
  static adminAuth = new AdminAuthModule($api.$axios);
  static statutoryPayments = new StatutoryPaymentsModule($api.$axios);
  static files = new FilesModule($api.$axios);
}
