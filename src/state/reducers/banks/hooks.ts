import { useAppSelector } from "../../hooks";
import { Bank } from "../../../helpers/api/modules/banks/types";

export const useBanks = (query?: Record<string, unknown>) => {
  const banks = useAppSelector((state) => state.banks);
  const queryKey = JSON.stringify(query || {});

  return {
    banks: banks.data[queryKey]?.data || [],
    loading: banks.loading,
    error: banks.error,
    meta: banks.data[queryKey]?.meta,
  };
};

export const useAllBanks = () => {
  const banks = useAppSelector((state) => state.banks);

  // Get all banks from all queries
  const allBanks: Bank[] = [];
  Object.values(banks.data).forEach((response) => {
    if (response?.data) {
      allBanks.push(...response.data);
    }
  });

  // Remove duplicates based on ID
  const uniqueBanks = allBanks.filter(
    (bank, index, self) => index === self.findIndex((b) => b.id === bank.id)
  );

  return {
    banks: uniqueBanks,
    loading: banks.loading,
    error: banks.error,
  };
};
