import { useAppDispatch } from "../../../state/hooks";

export type UsePageContextDataParams<P extends Record<string, unknown>> = {
  stateKey: "users" | "transfers" | "payrollEmployees" | "companies";
  initialParams: P;
  getData(
    dispatch: ReturnType<typeof useAppDispatch>,
    query: P
  ): Promise<unknown>;
};
