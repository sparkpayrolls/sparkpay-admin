import React, { useState, useEffect, useCallback } from "react";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";
import { PayrollEmployee } from "../../helpers/api/modules/payroll/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";

export const usePayrollTransfersPageContext = () => {
  const [apiResponse, setApiResponse] = useState<Awaited<
    ReturnType<typeof $api.payroll.getPayrollEmployees>
  > | null>(null);
  const [params, setParams] = useState({
    page: 0,
    limit: 10,
    status: [] as string[],
    datePeriod: "",
    date: null,
    startDate: null,
    endDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [shouldRefresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const getPayrollEmployees = useCallback(() => {
    setLoading(true);
    $api.payroll
      .getPayrollEmployees(params)
      .then(setApiResponse)
      .catch(() => setRefresh(true))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    getPayrollEmployees();
  }, [getPayrollEmployees]);

  const handlePageChange = (_: unknown, page: number) => {
    setParams({ ...params, page });
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setParams({ ...params, limit: +event.target.value });
  };
  const retryFailedTransfer = (employeeId: string) => {
    setLoading(true);
    $api.payroll.retryFailedTransfers([employeeId]).finally(() => {
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
  const showFilterPopover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterPopover = () => setAnchorEl(null);
  const { values, getCustomChangeHandler, handleChange, handleSubmit, reset } =
    useFormContext<Omit<typeof params, "page" | "limit">>({
      onSubmit(values, helpers) {
        setParams({ ...params, ...values });
        setAnchorEl(null);
        helpers.setSubmitting(false);
      },
      initialValues: params,
    });
  const transformDateValue = (value: moment.Moment | null) => value?.toDate();

  return {
    anchorEl,
    apiResponse,
    loading,
    params,
    shouldRefresh,
    rowsPerPageOptions: [10, 100, 1000, { value: -1, label: "All" }],
    statusItems: [
      {
        value: "failed",
        label: "Failed",
        checked: values.status.includes("failed"),
      },
      {
        value: "successful",
        label: "Successful",
        checked: values.status.includes("successful"),
      },
      {
        value: "pending",
        label: "Pending",
        checked: values.status.includes("pending"),
      },
      {
        value: "processing",
        label: "Processing",
        checked: values.status.includes("processing"),
      },
    ],
    values,
    closeFilterPopover,
    getCustomChangeHandler,
    getTransferOptions,
    handleChange,
    handlePageChange,
    handleSubmit,
    handleRowsPerPageChange,
    refresh() {
      setRefresh(false);
      getPayrollEmployees();
    },
    reset,
    showFilterPopover,
    transformDateValue,
  };
};
