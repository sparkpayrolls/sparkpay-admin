import { useAppDispatch } from "../../../state/hooks";

export type UsePageContextDataParams<P = Record<string, unknown>> = {
  stateKey:
    | "users"
    | "transfers"
    | "payrollEmployees"
    | "companies"
    | "payrolls"
    | "authTokens"
    | "statutoryPayments";
  initialParams: P;
  getData(
    dispatch: ReturnType<typeof useAppDispatch>,
    query: P
  ): Promise<unknown>;
};
