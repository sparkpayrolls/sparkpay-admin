import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";
import { PayrollEmployee } from "../../helpers/api/modules/payroll/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { Util } from "../../helpers/util/util";
import { useParamStateKey } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPayrollEmployees } from "../../state/reducers/payroll-employees/payroll-employee.reducer";

export const usePayrollTransfersPageContext = () => {
  const dispatch = useAppDispatch();
  const payrollEmployees = useAppSelector((state) => state.payrollEmployees);
  const [loading, setLoading] = useState(false);
  const [shouldRefresh, setRefresh] = useState(false);
  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    status: [] as string[],
    datePeriod: "",
    date: null,
    startDate: null,
    endDate: null,
  });
  const key = useParamStateKey(params, payrollEmployees);

  const _getPayrollEmployees = useCallback(() => {
    setLoading(true);
    getPayrollEmployees(dispatch, params)
      .catch(() => setRefresh(true))
      .finally(() => setLoading(false));
  }, [dispatch, params]);

  useEffect(() => {
    _getPayrollEmployees();
  }, [_getPayrollEmployees]);

  const handlePageChange = (_: unknown, page: number) => {
    setParams({ ...params, page });
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setParams({ ...params, limit: +event.target.value });
  };
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
    ],
    loading,
    params,
    shouldRefresh,
    title: `${Util.formatMoneyNumber(meta?.total || 0, 0)} Payroll employees`,
    handlePageChange,
    handleRowsPerPageChange,
    refresh() {
      setRefresh(false);
      _getPayrollEmployees();
    },
    retryFailedTransfer,
    transformDateValue,
  };
};
