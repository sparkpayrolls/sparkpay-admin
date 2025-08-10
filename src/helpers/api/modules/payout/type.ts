import { QueryParams } from "../../types";

export type GetTransfersQuery = {
  status?: string[];
  datePeriod?: string;
  date?: null | Date;
  startDate?: null | Date;
  endDate?: null | Date;
} & QueryParams;

export type Transfer = {
  amount: number;
  accountName?: string;
  accountNumber?: string;
  bank?: {
    id: string;
    name: string;
  };
  createdAt: string;
  id: string;
  payoutMethod: { country: { currencySymbol: string } };
  reference: string;
  status: string;
  remark: string;
  providerResponse?: any;
  meta?: any;
};

export type ValidateAccountDetailsPayload = {
  accountNumber: string;
  bank: string;
};
