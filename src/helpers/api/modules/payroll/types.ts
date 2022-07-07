import { Country } from "../../../../types";

export type GetPayrollEmployeeQuery = {
  page?: number;
  limit?: number;
  status?: string[];
  datePeriod?: string;
  date?: null | Date;
  startDate?: null | Date;
  endDate?: null | Date;
};

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
};
