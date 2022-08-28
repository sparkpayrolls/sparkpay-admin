import { useState, useCallback, useEffect } from "react";
import { useParamStateKey } from "../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { UsePageContextDataParams } from "./types";

export const usePageContextData = <K, P extends Record<string, unknown>>(
  params: UsePageContextDataParams<P>
) => {
  const { stateKey, initialParams, getData } = params;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state[stateKey]);
  const [loading, setLoading] = useState(false);
  const [shouldRefresh, setRefresh] = useState(false);
  const [_params, setParams] = useState(initialParams);
  const key = useParamStateKey(_params, data);

  const _getData = useCallback(() => {
    setLoading(true);
    getData(dispatch, _params)
      .catch(() => setRefresh(true))
      .finally(() => setLoading(false));
  }, [dispatch, getData, _params]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  const refresh = () => {
    setRefresh(false);
    _getData();
  };

  const onPageChange = (_: unknown, page: number) => {
    setParams({ ..._params, page });
  };

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setParams({ ..._params, limit: +event.target.value });
  };

  return {
    data: data as unknown as K,
    loading,
    shouldRefresh,
    key,
    page: (_params.page || 0) as number,
    rowsPerPage: (_params.limit || 10) as number,
    params: _params,
    setParams,
    onPageChange,
    onRowsPerPageChange,
    refresh,
    setLoading,
  };
};
