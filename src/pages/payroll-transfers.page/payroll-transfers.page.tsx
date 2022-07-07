import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { usePayrollTransfersPageContext } from "./hooks";
import { PayrollEmployeeTableFilterContent } from "./payroll-employee-table-filter-content.component";

function _PayrollTransfersPage() {
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
    transformDateValue,
  } = usePayrollTransfersPageContext();

  return (
    <DashboardLayout loading={loading}>
      <DataTable
        count={count}
        rowsPerPage={params.limit}
        page={params.page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        data={data}
        headRow={headRow}
        refresh={refresh}
        shouldRefresh={shouldRefresh}
        title={title}
        filterContent={
          <PayrollEmployeeTableFilterContent
            transformDateValue={transformDateValue}
            formContext={filterFormContext}
          />
        }
      />
    </DashboardLayout>
  );
}

const PayrollTransfersPage = WithAuth(_PayrollTransfersPage);

export default PayrollTransfersPage;
