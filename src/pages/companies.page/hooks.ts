import { $api } from "../../helpers/api/api";
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
    setLoading,
    refresh,
  } = usePageContextData<
    Record<string, ApiResponseWithMeta<GetCompaniesResponse[]>>,
    GetCompaniesQueryParams
  >({
    getData: getComapnies,
    initialParams: { page: 0, limit: 100 },
    stateKey: "companies",
  });

  const deleteCompany = (company: string | string[]) => {
    setLoading(true);
    $api.company
      .deleteCompanies(Array.isArray(company) ? company : [company])
      .then(() => refresh())
      .finally(() => {
        setLoading(false);
      });
  };

  const { data, meta } = users[key] || {};
  const count = meta?.total || 0;
  const title = `${Util.formatMoneyNumber(count, 0)} Companies`;
  const headerRow = [
    "Name",
    "Country",
    "Email",
    "Employee\xa0Count",
    "Payroll\xa0Burden",
    "Wallet\xa0Balance",
    "Payroll\xa0Count",
    "Owner",
    "Owner\xa0Email",
    "Date\xa0Created",
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
    deleteCompany,
    onPageChange,
    onRowsPerPageChange,
    refresh,
  };
};
