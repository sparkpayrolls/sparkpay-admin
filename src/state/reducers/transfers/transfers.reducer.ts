import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import {
  GetTransfersQuery,
  Transfer,
} from "../../../helpers/api/modules/payout/type";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const TransfersSlice = createSlice({
  name: STATE.TRANSFERS,
  initialState: {} as Record<string, ApiResponseWithMeta<Transfer[]>>,
  reducers: {
    commitTransfer(
      state,
      action: PayloadAction<Record<string, ApiResponseWithMeta<Transfer[]>>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitTransfer } = TransfersSlice.actions;

export const getTransfers = async (
  dispatch: AppDispatch,
  query: GetTransfersQuery
) => {
  const response = await $api.payout.getTransfers(query);

  dispatch(commitTransfer({ [JSON.stringify(query)]: response }));
};

export default TransfersSlice.reducer;
