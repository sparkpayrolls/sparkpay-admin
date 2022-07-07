import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import {
  GetPayrollEmployeeQuery,
  PayrollEmployee,
} from "../../../helpers/api/modules/payroll/types";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const PayrollEmployeesSlice = createSlice({
  name: STATE.PAYROLL_EMPLOYEES,
  initialState: {} as Record<string, ApiResponseWithMeta<PayrollEmployee[]>>,
  reducers: {
    commitEmployees(
      state,
      action: PayloadAction<
        Record<string, ApiResponseWithMeta<PayrollEmployee[]>>
      >
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitEmployees } = PayrollEmployeesSlice.actions;

export const getPayrollEmployees = async (
  dispatch: AppDispatch,
  query: GetPayrollEmployeeQuery
) => {
  const response = await $api.payroll.getPayrollEmployees(query);

  dispatch(commitEmployees({ [JSON.stringify(query)]: response }));
};

export default PayrollEmployeesSlice.reducer;
