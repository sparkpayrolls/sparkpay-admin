import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import { DataTable } from "../../components/datatable.component/datatable.component";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { useUserPageContext } from "./hooks";

function _UsersPage() {
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
  } = useUserPageContext();

  const _data = data.map((item) => {
    return {
      cells: [
        { label: item.id },
        { label: `${item.firstname} ${item.lastname}` },
        { label: item.email },
        { label: item.country.name },
        {
          label: (
            <Tooltip
              title={
                <>
                  {item.companies.map((company) => (
                    <Chip
                      key={company.id}
                      label={company.company.name}
                      color="secondary"
                    />
                  ))}
                </>
              }
              arrow
            >
              <span>{item.companies.length}</span>
            </Tooltip>
          ),
        },
        { label: moment(item.createdAt).format("MMMM DD, YYYY") },
      ],
    };
  });

  return (
    <DashboardLayout>
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

const UsersPage = WithAuth(_UsersPage);

export default UsersPage;
