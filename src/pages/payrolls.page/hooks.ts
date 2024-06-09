import moment from "moment";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import { getPayrolls } from "../../state/reducers/payrolls/payroll.reducer";
import { Company, Country, Payroll } from "../../types";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";

export const usePayrollsPageContext = () => {
  const initialParams = {
    page: 0,
    limit: 100,
    status: [],
    endDate: null,
    startDate: null,
  };
  const {
    data: payrollEmployees,
    loading,
    shouldRefresh,
    key,
    params,
    setParams,
    setLoading,
    refresh,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
  } = usePageContextData<
    Record<string, ApiResponseWithMeta<Payroll[]>>,
    typeof initialParams
  >({
    getData: getPayrolls,
    initialParams,
    stateKey: "payrolls",
  });

  const filterFormContext = useFormContext<
    Omit<typeof params, "page" | "limit">
  >({
    onSubmit(values, helpers) {
      setParams({ ...params, ...values });
      helpers.setSubmitting(false);
    },
    initialValues: params,
  });

  const { data, meta } = payrollEmployees[key] || {};

  const runPayroll = (payroll: string | string[]) => {
    setLoading(true);
    $api.payroll
      .runPayroll(Array.isArray(payroll) ? payroll : [payroll])
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePayroll = (payroll: string | string[]) => {
    setLoading(true);
    $api.payroll
      .deletePayroll(Array.isArray(payroll) ? payroll : [payroll])
      .then(() => refresh())
      .finally(() => {
        setLoading(false);
      });
  };

  const resumePayroll = (payroll: string | string[]) => {
    setLoading(true);
    $api.payroll
      .resumePayroll(Array.isArray(payroll) ? payroll : [payroll])
      .then(() => refresh())
      .finally(() => {
        setLoading(false);
      });
  };

  const getPayrollOptions = (payroll: Payroll) => {
    const options: TableMoreCellOption[] = [];

    if (
      ["processing", "pending"].includes(payroll.status) &&
      moment(payroll.payDate).isBefore(moment().endOf("day"))
    ) {
      options.push({
        label: "Run Payroll",
        onClick() {
          runPayroll(payroll.id);
        },
      });
    }

    if (["paused"].includes(payroll.status)) {
      options.push({
        label: "Resume Payroll",
        onClick() {
          resumePayroll(payroll.id);
        },
      });
    }

    if (["paused", "pending"].includes(payroll.status)) {
      options.push({
        label: "Delete Payroll",
        onClick() {
          deletePayroll(payroll.id);
        },
      });
    }

    return options;
  };

  return {
    count: meta?.total || 0,
    data:
      data?.map((item) => {
        const company = item.company as Company;
        const country = company?.country as Country;
        const currencySymbol = country?.currencySymbol;
        const wallet = company?.wallet;

        return {
          cells: [
            item.id,
            company?.name,
            Util.currencyFormatMoneyNumber(currencySymbol, item.totalAmount),
            Util.currencyFormatMoneyNumber(currencySymbol, item.fee),
            Util.currencyFormatMoneyNumber(currencySymbol, wallet?.balance),
            Util.formatMoneyNumber(item.size, 0),
            item.status,
            moment(item.createdAt).format("MMMM DD, YYYY"),
            moment(item.payDate).format("MMMM DD, YYYY"),
          ],
          moreOptions: getPayrollOptions(item),
        };
      }) || [],
    filterFormContext,
    headRow: [
      { label: "ID" },
      { label: "Company" },
      { label: "Amount" },
      { label: "Fee" },
      { label: "Wallet Balance" },
      { label: "Size" },
      { label: "Status" },
      { label: "Date Created" },
      { label: "Pay Date" },
    ],
    loading,
    params,
    shouldRefresh,
    title: `${Util.formatMoneyNumber(meta?.total || 0, 0)} Payroll`,
    handlePageChange,
    handleRowsPerPageChange,
    refresh,
  };
};
