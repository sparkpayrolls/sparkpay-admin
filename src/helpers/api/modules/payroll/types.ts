import { Country, Payroll } from "../../../../types";
import { QueryParams } from "../../types";

export type GetPayrollEmployeeQuery = {
  status?: string[];
  datePeriod?: string;
  date?: null | Date;
  startDate?: null | Date;
  endDate?: null | Date;
} & QueryParams;

type Employee = {
  id: string;
  firstname: string;
  lastname: string;
};

type Company = {
  name: string;
};

export type PayrollEmployee = {
  payoutStatus: string;
  netSalary: number;
  id: string;
  createdAt: string;
  remark: string;
  company: Company;
  employee: Employee;
  country: Pick<Country, "currencySymbol">;
  transfer: string;
  payroll: Pick<Payroll, "id" | "payDate" | "status">;
};
