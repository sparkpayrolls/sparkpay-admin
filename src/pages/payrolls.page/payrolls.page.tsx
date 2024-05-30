import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { PayrollEmployeeTableFilterContent } from "../payroll-transfers.page/payroll-employee-table-filter-content.component";
import { usePayrollsPageContext } from "./hooks";

function _PayrollsPage() {
  const {
    count,
    data,
    filterFormContext,
    headRow,
    loading,
    params,
    shouldRefresh,
    title,
    handlePageChange,
    handleRowsPerPageChange,
    refresh,
  } = usePayrollsPageContext();

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
        filterContent={
          <PayrollEmployeeTableFilterContent
            formContext={filterFormContext as any}
            statuses={["pending", "processing", "completed", "paused"]}
          />
        }
      />
    </DashboardLayout>
  );
}

const PayrollsPage = WithAuth(_PayrollsPage);

export default PayrollsPage;
