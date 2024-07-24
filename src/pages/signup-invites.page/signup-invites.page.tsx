import AddIcon from "@mui/icons-material/Add";
import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useSignupInvitePageContext } from "./hooks";
import { AppTable } from "../../components/table.component/table.component";

function _SignupInvitePage() {
  const {
    count,
    data,
    headRow,
    loading,
    params,
    shouldRefresh,
    title,
    handlePageChange,
    handleRowsPerPageChange,
    refresh,
    createInviteToken,
  } = useSignupInvitePageContext();

  return (
    <DashboardLayout loading={loading}>
      <DataTable
        count={count}
        rowsPerPage={params.limit || 10}
        page={params.page || 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        data={data}
        headRow={headRow}
        refresh={refresh}
        shouldRefresh={shouldRefresh}
        title={title}
        toolBarContent={
          <AppTable.Button
            onClick={createInviteToken}
            endIcon={<AddIcon className="table__icon" />}
          >
            Create Invite Token
          </AppTable.Button>
        }
      />
    </DashboardLayout>
  );
}

const SignupInvitePage = WithAuth(_SignupInvitePage);

export default SignupInvitePage;
