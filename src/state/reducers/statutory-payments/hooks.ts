import { useAppSelector } from "../../hooks";
import { StatutoryPayment } from "../../../helpers/api/modules/statutory-payments/types";

export const useStatutoryPayments = (query?: Record<string, unknown>) => {
  const statutoryPayments = useAppSelector((state) => state.statutoryPayments);
  const queryKey = JSON.stringify(query || {});

  return {
    statutoryPayments: statutoryPayments.data[queryKey]?.data || [],
    loading: statutoryPayments.loading,
    error: statutoryPayments.error,
    meta: statutoryPayments.data[queryKey]?.meta,
  };
};

export const useAllStatutoryPayments = () => {
  const statutoryPayments = useAppSelector((state) => state.statutoryPayments);

  // Get all statutory payments from all queries
  const allStatutoryPayments: StatutoryPayment[] = [];
  Object.values(statutoryPayments.data).forEach((response) => {
    if (response?.data) {
      allStatutoryPayments.push(...response.data);
    }
  });

  // Remove duplicates based on ID
  const uniqueStatutoryPayments = allStatutoryPayments.filter(
    (statutoryPayment, index, self) =>
      index === self.findIndex((sp) => sp.id === statutoryPayment.id)
  );

  return {
    statutoryPayments: uniqueStatutoryPayments,
    loading: statutoryPayments.loading,
    error: statutoryPayments.error,
  };
};
