import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import {
  GetStatutoryPaymentsQuery,
  StatutoryPayment,
} from "../../../helpers/api/modules/statutory-payments/types";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export interface StatutoryPaymentsState {
  data: Record<string, ApiResponseWithMeta<StatutoryPayment[]>>;
  loading: boolean;
  error: string | null;
  [key: string]: unknown;
}

const initialState: StatutoryPaymentsState = {
  data: {},
  loading: false,
  error: null,
};

export const StatutoryPaymentsSlice = createSlice({
  name: STATE.STATUTORY_PAYMENTS,
  initialState,
  reducers: {
    commitStatutoryPayments(
      state,
      action: PayloadAction<
        Record<string, ApiResponseWithMeta<StatutoryPayment[]>>
      >
    ) {
      state.data = { ...state.data, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    setStatutoryPaymentsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setStatutoryPaymentsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  commitStatutoryPayments,
  setStatutoryPaymentsLoading,
  setStatutoryPaymentsError,
} = StatutoryPaymentsSlice.actions;

export const getStatutoryPayments = async (
  dispatch: AppDispatch,
  query?: GetStatutoryPaymentsQuery
) => {
  try {
    dispatch(setStatutoryPaymentsLoading(true));
    dispatch(setStatutoryPaymentsError(null));

    const response = await $api.statutoryPayments.getStatutoryPayments(query);

    dispatch(
      commitStatutoryPayments({ [JSON.stringify(query || {})]: response })
    );
  } catch (error) {
    dispatch(
      setStatutoryPaymentsError(
        error instanceof Error
          ? error.message
          : "Failed to fetch statutory payments"
      )
    );
  }
};

export default StatutoryPaymentsSlice.reducer;
