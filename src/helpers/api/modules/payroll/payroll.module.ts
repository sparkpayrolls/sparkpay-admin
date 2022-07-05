import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetPayrollEmployeeQuery, PayrollEmployee } from "./types";

export class PayrollModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payrolls");
  }
  getPayrollEmployees(params: GetPayrollEmployeeQuery) {
    return this.$get<ApiResponseWithMeta<PayrollEmployee[]>>("/employees", {
      params,
    });
  }

  async retryFailedTransfers(employeeIds?: string[]) {
    await this.$post("/retry-failed-transfers", null, {
      params: { employeeIds },
    });
  }
}
