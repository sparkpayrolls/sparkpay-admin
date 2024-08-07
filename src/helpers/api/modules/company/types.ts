import { Company, Country, User } from "../../../../types";
import { QueryParams } from "../../types";

export type GetCompaniesQueryParams = QueryParams & {
  search?: string;
};

export type GetCompaniesResponse = Pick<
  Company,
  | "name"
  | "email"
  | "phonenumber"
  | "salaryBreakdown"
  | "createdAt"
  | "updatedAt"
  | "id"
  | "wallet"
> & {
  employeeCount: number;
  processedPayrollCount: number;
  payrollBurden: number;
  owner: {
    id: string;
    company: string;
    user: Pick<User, "avatar" | "id" | "firstname" | "lastname" | "email">;
  };
  country: Pick<Country, "name" | "id">;
};
