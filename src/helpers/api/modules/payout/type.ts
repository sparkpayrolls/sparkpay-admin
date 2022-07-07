export type GetTransfersQuery = {
  page?: number;
  limit?: number;
  status?: string[];
  datePeriod?: string;
  date?: null | Date;
  startDate?: null | Date;
  endDate?: null | Date;
};

export type Transfer = {
  amount: number;
  createdAt: string;
  id: string;
  payoutMethod: { country: { currencySymbol: string } };
  reference: string;
  status: string;
  remark: string;
};
