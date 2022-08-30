import { useState, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getDashboardData } from "../../state/reducers/dashboard/dashboard.reducer";
import { useIndexPageContextParam } from "./types";

export const useIndexPageContext = (param: useIndexPageContextParam) => {
  const { getDataRetrievalErrorHandler } = param;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.dashboard);
  const [loading, setLoading] = useState(false);
  const { current: _getDataRetrievalErrorHandler } = useRef(
    getDataRetrievalErrorHandler
  );

  const getData = useCallback(() => {
    setLoading(true);
    getDashboardData(dispatch)
      .catch(_getDataRetrievalErrorHandler(getData))
      .finally(() => setLoading(false));
  }, [_getDataRetrievalErrorHandler, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getTrendDatesAndAmounts = (trend: Record<string, number>) => {
    const trendDates = [] as string[];
    const trendAmounts = [] as number[];
    Object.entries(trend)
      .sort(([dateA], [dateB]) => (dateA > dateB ? 1 : -1))
      .forEach(([date, amount]) => {
        trendDates.push(date);
        trendAmounts.push(amount);
      });

    const [currentAmount] = trendAmounts.slice(-1);
    const [previousAmount] = trendAmounts.slice(-2);

    return { trendDates, trendAmounts, currentAmount, previousAmount };
  };

  return { data, loading, getTrendDatesAndAmounts };
};
