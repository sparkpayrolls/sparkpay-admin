import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";

export type Params = {
  page: number;
  limit: number;
  status: string[];
  datePeriod: string;
  date: null;
  startDate: null;
  endDate: null;
};

export type PayrollEmployeeTableFilterContentProps = {
  formContext: ReturnType<
    typeof useFormContext<Omit<Params, "page" | "limit">>
  >;
  transformDateValue?: (value: moment.Moment | null) => Date | undefined;
  statuses?: string[];
};
