import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useStatutoryPaymentsPageContext } from "./hooks";
import { StatutoryPaymentsTableFilterContent } from "./statutory-payments-table-filter-content.component";

function _StatutoryPaymentsPage() {
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
  } = useStatutoryPaymentsPageContext();

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
          <StatutoryPaymentsTableFilterContent
            formContext={filterFormContext}
          />
        }
        toolBarContent={null}
      />
    </DashboardLayout>
  );
}

const StatutoryPaymentsPage = WithAuth(_StatutoryPaymentsPage);

export default StatutoryPaymentsPage;
