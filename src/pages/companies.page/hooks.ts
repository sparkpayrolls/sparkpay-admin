import {
  GetCompaniesQueryParams,
  GetCompaniesResponse,
} from "../../helpers/api/modules/company/types";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { Util } from "../../helpers/util/util";
import { getComapnies } from "../../state/reducers/companies/companies.reducer";

export const useCompaniesPageContext = () => {
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
    Record<string, ApiResponseWithMeta<GetCompaniesResponse[]>>,
    GetCompaniesQueryParams
  >({
    getData: getComapnies,
    initialParams: { page: 0, limit: 10 },
    stateKey: "companies",
  });

  const { data, meta } = users[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Companies`;
  const headerRow = [
    { label: "Name" },
    { label: "Country" },
    { label: "Email" },
    { label: "Employee\xa0Count" },
    { label: "Payroll\xa0Count" },
    { label: "Owner" },
    { label: "Owner\xa0Email" },
    { label: "Date\xa0Created" },
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
