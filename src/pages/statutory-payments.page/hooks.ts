import moment from "moment";
import { TableMoreCellOption } from "../../components/table.component/types";
import {
  GetStatutoryPaymentsQuery,
  StatutoryPayment,
} from "../../helpers/api/modules/statutory-payments/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import {
  getStatutoryPayments,
  StatutoryPaymentsState,
} from "../../state/reducers/statutory-payments/statutory-payments.reducer";
import { $api } from "../../helpers/api/api";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";

export const useStatutoryPaymentsPageContext = () => {
  const {
    data: statutoryPayments,
    loading,
    shouldRefresh,
    key,
    params,
    setParams,
    refresh,
    onPageChange,
    onRowsPerPageChange,
  } = usePageContextData<StatutoryPaymentsState, GetStatutoryPaymentsQuery>({
    getData: getStatutoryPayments,
    initialParams: {
      page: 0,
      limit: 100,
      status: [],
      type: [],
    },
    stateKey: "statutoryPayments",
  });

  const getStatutoryPaymentOptions = (statutoryPayment: StatutoryPayment) => {
    const options: TableMoreCellOption[] = [];

    if (statutoryPayment.transfer?.status === "successful") {
      options.push({
        label: "Resend payment schedules",
        onClick() {
          $api.statutoryPayments
            .retryTransferSuccessProcess(statutoryPayment.transfer.id)
            .then(() => {
              snackbar({
                open: true,
                message: "Payment schedules resent successfully",
              });
            })
            .catch((error) => {
              snackbar({
                open: true,
                message: error.message,
              });
            });
        },
      });
    }

    return options;
  };

  const { data, meta } = statutoryPayments.data[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Statutory Payments`;
  const _data = data?.map((item) => {
    const amount = Util.formatMoneyNumber(item.totalAmount, 2);

    return {
      cells: [
        { label: item.id },
        { label: item.company.name },
        { label: item.statutoryType },
        { label: `${amount}` },
        {
          label: item.payrolls
            .map((p) => `${p.year}/${p.proRateMonth}`)
            .join(", "),
        },
        { label: item.status },
        { label: item.transfer?.id },
        { label: item.transfer?.status },
        { label: moment(item.createdAt).format("MMMM DD, YYYY") },
      ],
      moreOptions: getStatutoryPaymentOptions(item),
    };
  });
  const headerRow = [
    { label: "ID" },
    { label: "Company" },
    { label: "Type" },
    { label: "Amount" },
    { label: "Periods" },
    { label: "Status" },
    { label: "Transfer ID" },
    { label: "Transfer Status" },
    { label: "Date Created" },
  ];
  const filterFormContext = useFormContext<GetStatutoryPaymentsQuery>({
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
    shouldRefresh,
    title,
  };
};

export const useStatutoryPaymentsTableFilterContentContext = (params: {
  status?: string[];
  type?: string[];
}) => {
  const { status = [], type = [] } = params;
  const transformDateValue = (value: moment.Moment | null) => value?.toDate();
  const statusItems = [
    {
      value: "failed",
      label: "Failed",
      checked: status.includes("failed"),
    },
    {
      value: "completed",
      label: "Completed",
      checked: status.includes("completed"),
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

  const typeItems = [
    {
      value: "tax",
      label: "Tax",
      checked: type.includes("tax"),
    },
    {
      value: "pension",
      label: "Pension",
      checked: type.includes("pension"),
    },
    {
      value: "nhf",
      label: "NHF",
      checked: type.includes("nhf"),
    },
  ];

  return { statusItems, typeItems, transformDateValue };
};
