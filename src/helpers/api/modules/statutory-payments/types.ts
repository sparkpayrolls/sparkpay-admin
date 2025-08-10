import { QueryParams } from "../../types";

export type GetStatutoryPaymentsQuery = {
  status?: string[];
  type?: string[];
} & QueryParams;

export type StatutoryPayment = {
  id: string;
  totalAmount: number;
  statutoryType: string;
  status: string;
  payrolls: {
    year: string;
    proRateMonth: string;
  }[];
  createdAt: string;
  updatedAt: string;
  company: {
    id: string;
    name: string;
  };
  transfer: {
    id: string;
    status: string;
  };
  receipts: string[];
};
