import moment from "moment";
import { TableMoreCellOption } from "../../components/table.component/types";
import { $api } from "../../helpers/api/api";
import {
  GetTransfersQuery,
  Transfer,
} from "../../helpers/api/modules/payout/type";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import { getTransfers } from "../../state/reducers/transfers/transfers.reducer";
import get from "lodash.get";

export const useTrannsferPageContext = () => {
  const {
    data: transfers,
    loading,
    shouldRefresh,
    key,
    params,
    setParams,
    setLoading,
    refresh,
    onPageChange,
    onRowsPerPageChange,
  } = usePageContextData<
    Record<string, ApiResponseWithMeta<Transfer[]>>,
    GetTransfersQuery
  >({
    getData: getTransfers,
    initialParams: {
      page: 0,
      limit: 100,
      status: [],
      datePeriod: "",
      date: null,
      endDate: null,
      startDate: null,
    },
    stateKey: "transfers",
  });

  const retryFailedTransfer = async (employeeId?: string) => {
    setLoading(true);
    if (employeeId) await $api.payment.retryFailedTransfers([employeeId]);
    // else await $api.payment.retryFailedTransfers();
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

  const { data, meta } = transfers[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Transfers`;
  const _data = data?.map((item) => {
    const amount = Util.formatMoneyNumber(item.amount, 2);

    return {
      cells: [
        { label: item.id },
        {
          label:
            item.accountName ||
            get(item.meta, "webhook.data.recipient.details.account_name") ||
            get(
              item.providerResponse,
              "successEventPayload.data.recipient.details.account_name",
              "--- ---"
            ),
        },
        {
          label:
            get(item.meta, "webhook.data.recipient.details.account_name") ||
            get(
              item.providerResponse,
              "successEventPayload.data.recipient.details.account_name"
            ) ||
            item.accountName ||
            "--- ---",
        },
        {
          label:
            item.accountNumber ||
            get(
              item.providerResponse,
              "successEventPayload.data.recipient.details.account_number",
              "--- ---"
            ),
        },
        { label: `${amount}` },
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
    { label: "Employee Name" },
    { label: "Account Name" },
    { label: "Account Number" },
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
