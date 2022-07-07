import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useTrannsferPageContext } from "./hooks";
import { TransfersTableFilterContent } from "./transfer-table-filter-content.component";

function _TransfersPage() {
  const {
    count,
    data,
    filterFormContext,
    headerRow,
    loading,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    refresh,
    shouldRefresh,
    title,
  } = useTrannsferPageContext();

  return (
    <DashboardLayout loading={loading}>
      <DataTable
        count={count}
        data={data}
        headRow={headerRow}
        onPageChange={onPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        refresh={refresh}
        shouldRefresh={shouldRefresh}
        title={title}
        filterContent={
          <TransfersTableFilterContent formContext={filterFormContext} />
        }
      />
    </DashboardLayout>
  );
}

const TransfersPage = WithAuth(_TransfersPage);

export default TransfersPage;
