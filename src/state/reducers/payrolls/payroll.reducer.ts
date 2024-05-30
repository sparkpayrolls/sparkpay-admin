import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATE } from "../../../helpers/constants";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { Payroll } from "../../../types";
import { AppDispatch } from "../../store";
import { $api } from "../../../helpers/api/api";

export const PayrollsSlce = createSlice({
  name: STATE.PAYROLLS,
  initialState: {} as Record<string, ApiResponseWithMeta<Payroll[]>>,
  reducers: {
    commitPayrolls(
      state,
      action: PayloadAction<Record<string, ApiResponseWithMeta<Payroll[]>>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitPayrolls } = PayrollsSlce.actions;

export const getPayrolls = async (dispatch: AppDispatch, query: unknown) => {
  const response = await $api.payroll.getPayrolls(query);

  dispatch(commitPayrolls({ [JSON.stringify(query)]: response }));
};

export default PayrollsSlce.reducer;
