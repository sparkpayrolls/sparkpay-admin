import { AxiosInstance } from "axios";
import { ApiResponseWithMeta } from "../../types";
import { BaseModule } from "../base/base.module";
import { GetPayrollEmployeeQuery, PayrollEmployee } from "./types";
import { Payroll } from "../../../../types";

export class PayrollModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/payrolls");
  }

  getPayrolls(params: unknown) {
    return this.$get<ApiResponseWithMeta<Payroll[]>>("/", {
      params,
    });
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

  async runPayroll(payrollIds?: string[]) {
    await this.$post("/run", null, {
      params: { payrollIds },
    });
  }

  async deletePayroll(payrollIds?: string[]) {
    await this.$delete("/delete", null, {
      params: { payrollIds },
    });
  }
}
