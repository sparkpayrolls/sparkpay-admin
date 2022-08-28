import {
  GetUsersQueryParams,
  GetUsersResponse,
} from "../../helpers/api/modules/user/types";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import { getUsers } from "../../state/reducers/users/users.reducer";

export const useUserPageContext = () => {
  const {
    data: users,
    key,
    loading,
    shouldRefresh,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    refresh,
  } = usePageContextData<
    Record<string, ApiResponseWithMeta<GetUsersResponse[]>>,
    GetUsersQueryParams
  >({
    getData: getUsers,
    initialParams: { page: 0, limit: 10 },
    stateKey: "users",
  });

  const { data, meta } = users[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Users`;
  const headerRow = [
    { label: "ID" },
    { label: "Name" },
    { label: "Email" },
    { label: "Country" },
    { label: "Company Count" },
    { label: "Date Created" },
  ];

  return {
    count,
    data: data || [],
    headerRow,
    title,
    loading,
    shouldRefresh,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    refresh,
  };
};
