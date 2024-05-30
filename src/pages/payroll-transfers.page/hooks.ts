import moment from "moment";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";
import {
  GetPayrollEmployeeQuery,
  PayrollEmployee,
} from "../../helpers/api/modules/payroll/types";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import { getPayrollEmployees } from "../../state/reducers/payroll-employees/payroll-employee.reducer";

export const usePayrollTransfersPageContext = () => {
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
    Record<string, ApiResponseWithMeta<PayrollEmployee[]>>,
    GetPayrollEmployeeQuery
  >({
    getData: getPayrollEmployees,
    initialParams: {
      page: 0,
      limit: 100,
      status: [],
      datePeriod: "",
      date: null,
      endDate: null,
      startDate: null,
    },
    stateKey: "payrollEmployees",
  });

  const retryFailedTransfer = (employeeId: string | string[]) => {
    setLoading(true);
    $api.payroll
      .retryFailedTransfers(
        Array.isArray(employeeId) ? employeeId : [employeeId]
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const getTransferOptions = (transfer: PayrollEmployee) => {
    const options: TableMoreCellOption[] = [];
    if (transfer.payoutStatus === "failed") {
      options.push({
        label: "Retry",
        onClick() {
          retryFailedTransfer(transfer.employee.id);
        },
      });
    }

    return options;
  };
  const filterFormContext = useFormContext<
    Omit<typeof params, "page" | "limit">
  >({
    onSubmit(values, helpers) {
      setParams({ ...params, ...values });
      helpers.setSubmitting(false);
    },
    initialValues: params,
  });
  const transformDateValue = (value: moment.Moment | null) => value?.toDate();
  const { data, meta } = payrollEmployees[key] || {};

  return {
    count: meta?.total || 0,
    data:
      data?.map((item) => {
        return {
          cells: [
            { label: `${item.employee?.firstname} ${item.employee?.lastname}` },
            { label: item.company?.name },
            {
              label: `${item.country?.currencySymbol} ${Util.formatMoneyNumber(
                item.netSalary
              )}`,
            },
            { label: item.payoutStatus },
            { label: item.transfer },
            { label: item.remark },
            { label: moment(item.createdAt).format("MMMM DD, YYYY") },
            { label: item.payroll.status },
            { label: moment(item.payroll.payDate).format("MMMM DD, YYYY") },
          ],
          moreOptions: getTransferOptions(item),
        };
      }) || [],
    filterFormContext,
    headRow: [
      { label: "Name" },
      { label: "Company" },
      { label: "Amount" },
      { label: "Status" },
      { label: "Transfer ID" },
      { label: "Remark" },
      { label: "Date Created" },
      { label: "Payroll Status" },
      { label: "Pay Date" },
    ],
    loading,
    params,
    shouldRefresh,
    title: `${Util.formatMoneyNumber(meta?.total || 0, 0)} Payroll employees`,
    handlePageChange,
    handleRowsPerPageChange,
    refresh,
    retryFailedTransfer,
    transformDateValue,
  };
};
