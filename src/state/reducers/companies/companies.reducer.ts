import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import {
  GetCompaniesQueryParams,
  GetCompaniesResponse,
} from "../../../helpers/api/modules/company/types";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const CompaniesSlice = createSlice({
  name: STATE.COMPANIES,
  initialState: {} as Record<
    string,
    ApiResponseWithMeta<GetCompaniesResponse[]>
  >,
  reducers: {
    commitCompanies(
      state,
      action: PayloadAction<
        Record<string, ApiResponseWithMeta<GetCompaniesResponse[]>>
      >
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitCompanies } = CompaniesSlice.actions;

export const getComapnies = async (
  dispatch: AppDispatch,
  query: GetCompaniesQueryParams
) => {
  const response = await $api.company.getCompanies(query);

  dispatch(commitCompanies({ [JSON.stringify(query)]: response }));
};

export default CompaniesSlice.reducer;
