import { QueryParams } from "../../types";

export type GetBanksQuery = {
  country?: string;
  active?: boolean;
} & QueryParams;

export type Bank = {
  id: string;
  name: string;
  code: string;
  country: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
