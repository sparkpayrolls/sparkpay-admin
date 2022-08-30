import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import { GetDataResponse } from "../../../helpers/api/modules/dashboard/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const DashboardSlice = createSlice({
  name: STATE.DASHBOARD,
  initialState: [] as GetDataResponse,
  reducers: {
    commitDashboardData(_state, action: PayloadAction<GetDataResponse>) {
      return action.payload;
    },
  },
});

export const { commitDashboardData } = DashboardSlice.actions;

export const getDashboardData = async (dispatch: AppDispatch) => {
  const response = await $api.dashboard.getData();

  dispatch(commitDashboardData(response));
};

export default DashboardSlice.reducer;
