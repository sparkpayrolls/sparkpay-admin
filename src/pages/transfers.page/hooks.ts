import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";
import {
  GetTransfersQuery,
  Transfer,
} from "../../helpers/api/modules/payout/type";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { Util } from "../../helpers/util/util";
import { useParamStateKey } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getTransfers } from "../../state/reducers/transfers/transfers.reducer";

export const useTrannsferPageContext = () => {
  const dispatch = useAppDispatch();
  const transfers = useAppSelector((state) => state.transfers);
  const [loading, setLoading] = useState(false);
  const [shouldRefresh, setRefresh] = useState(false);
  const [params, setParams] = useState<GetTransfersQuery>({
    page: 0,
    limit: 10,
    status: [],
    datePeriod: "",
    date: null,
    endDate: null,
    startDate: null,
  });
  const key = useParamStateKey(params, transfers);

  const _getTransfers = useCallback(() => {
    setLoading(true);
    getTransfers(dispatch, params)
      .catch(() => setRefresh(true))
      .finally(() => setLoading(false));
  }, [dispatch, params]);

  useEffect(() => {
    _getTransfers();
  }, [_getTransfers]);

  const retryFailedTransfer = async (employeeId?: string) => {
    setLoading(true);
    if (employeeId) await $api.payout.retryFailedTransfers([employeeId]);
    else await $api.payout.retryFailedTransfers();
    setLoading(false);
  };
  const getTransferOptions = (transfer: Transfer) => {
    const options: TableMoreCellOption[] = [];
    if (transfer.status === "failed") {
      options.push({
        label: "Retry",
        onClick() {
          retryFailedTransfer(transfer.id);
        },
      });
    }

    return options;
  };
  const refresh = () => {
    setRefresh(false);
    _getTransfers();
  };
  const onPageChange = (_: unknown, page: number) => {
    setParams({ ...params, page });
  };
  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setParams({ ...params, limit: +event.target.value });
  };

  const { data, meta } = transfers[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Transfers`;
  const _data = data?.map((item) => {
    const currencySymbol = item.payoutMethod?.country?.currencySymbol;
    const amount = Util.formatMoneyNumber(item.amount, 2);

    return {
      cells: [
        { label: item.id },
        { label: `${currencySymbol} ${amount}` },
        { label: item.reference },
        { label: item.status },
        { label: item.remark },
        { label: moment(item.createdAt).format("MMMM DD, YYYY") },
      ],
      moreOptions: getTransferOptions(item),
    };
  });
  const headerRow = [
    { label: "Transfer ID" },
    { label: "Amount" },
    { label: "Reference" },
    { label: "Status" },
    { label: "Remark" },
    { label: "Date Created" },
  ];
  const filterFormContext = useFormContext<GetTransfersQuery>({
    onSubmit(values, helpers) {
      setParams({ ...params, ...values });
      helpers.setSubmitting(false);
    },
    initialValues: params,
  });

  return {
    count,
    data: _data || [],
    filterFormContext,
    headerRow,
    loading,
    onPageChange,
    page: params.page || 0,
    rowsPerPage: params.limit || 10,
    onRowsPerPageChange,
    refresh,
    retryFailedTransfer,
    shouldRefresh,
    title,
  };
};

export const userTransfersTableFilterContentContext = (params: {
  status?: string[];
}) => {
  const { status = [] } = params;
  const transformDateValue = (value: moment.Moment | null) => value?.toDate();
  const statusItems = [
    {
      value: "failed",
      label: "Failed",
      checked: status.includes("failed"),
    },
    {
      value: "successful",
      label: "Successful",
      checked: status.includes("successful"),
    },
    {
      value: "pending",
      label: "Pending",
      checked: status.includes("pending"),
    },
    {
      value: "processing",
      label: "Processing",
      checked: status.includes("processing"),
    },
  ];

  return { statusItems, transformDateValue };
};
