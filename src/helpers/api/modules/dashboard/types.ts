import { Country } from "../../../../types";

export type DataPoint = {
  count: number;
  trend: Record<string, number>;
};

export type AmountDataPoint = {
  amount: number;
  amountTrend: Record<string, number>;
};

export type Data = {
  country: Pick<Country, "name" | "id" | "currency" | "currencySymbol">;
  companies: DataPoint;
  users: DataPoint;
  employees: DataPoint;
  payrolls: DataPoint & AmountDataPoint;
  revenue: AmountDataPoint;
};

export type GetDataResponse = Data[];
