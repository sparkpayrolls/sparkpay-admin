import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { DataTable } from "../../components/datatable.component/datatable.component";
import { Util } from "../../helpers/util/util";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useCompaniesPageContext } from "./hooks";
import NiceModal from "@ebay/nice-modal-react";
import { FundCompanyWalletModal } from "../../modals/fund-company-wallet.modal/fund-company-wallet.modal";

function _CompaniesPage() {
  const {
    count,
    data,
    headerRow,
    onPageChange,
    page,
    rowsPerPage,
    onRowsPerPageChange,
    refresh,
    shouldRefresh,
    title,
    loading,
    deleteCompany,
  } = useCompaniesPageContext();

  const _data = data.map((item) => {
    const name = `${item?.owner?.user?.firstname} ${item?.owner?.user?.lastname}`;

    return {
      cells: [
        {
          label: (
            <Typography
              title={item.name}
              className="white-space-nowrap text-clip-200"
            >
              {item.name}
            </Typography>
          ),
        },
        { label: item.country.name },
        {
          label: (
            <Typography
              title={item.email}
              className="white-space-nowrap text-clip-200"
            >
              {item.email}
            </Typography>
          ),
        },
        { label: Util.formatMoneyNumber(item.employeeCount, 0) },
        { label: Util.formatMoneyNumber(item.payrollBurden, 0) },
        { label: Util.formatMoneyNumber(item.wallet?.balance, 0) },
        { label: Util.formatMoneyNumber(item.processedPayrollCount, 0) },
        {
          label: (
            <Chip
              avatar={
                item.owner.user?.avatar ? (
                  <Avatar src={item.owner.user.avatar} alt={name} />
                ) : (
                  <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
                )
              }
              label={name}
            />
          ),
        },
        {
          label: (
            <Typography
              title={item.owner.user?.email}
              className="white-space-nowrap text-clip-200"
            >
              {item.owner.user?.email}
            </Typography>
          ),
        },
        {
          label: (
            <Typography className="white-space-nowrap">
              {moment(item.createdAt).format("MMMM DD, YYYY")}
            </Typography>
          ),
        },
      ],
      moreOptions: [
        {
          label: "Delete Company",
          onClick() {
            deleteCompany(item.id);
          },
        },
        {
          label: "Fund Wallet",
          onClick() {
            NiceModal.show(FundCompanyWalletModal, {
              companyId: item.id,
              companyName: item.name,
              companyWalletBalance: item.wallet?.balance,
            }).then(refresh);
          },
        },
      ],
    };
  });

  return (
    <DashboardLayout loading={loading}>
      <DataTable
        count={count}
        data={_data}
        headRow={headerRow}
        onPageChange={onPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        refresh={refresh}
        shouldRefresh={shouldRefresh}
        title={title}
      />
    </DashboardLayout>
  );
}

const CompaniesPage = WithAuth(_CompaniesPage);

export default CompaniesPage;
