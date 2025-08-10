import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import { GetBanksQuery, Bank } from "../../../helpers/api/modules/banks/types";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export interface BanksState {
  data: Record<string, ApiResponseWithMeta<Bank[]>>;
  loading: boolean;
  error: string | null;
}

const initialState: BanksState = {
  data: {},
  loading: false,
  error: null,
};

export const BanksSlice = createSlice({
  name: STATE.BANKS,
  initialState,
  reducers: {
    commitBanks(
      state,
      action: PayloadAction<Record<string, ApiResponseWithMeta<Bank[]>>>
    ) {
      state.data = { ...state.data, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    setBanksLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setBanksError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { commitBanks, setBanksLoading, setBanksError } =
  BanksSlice.actions;

export const getBanks = async (
  dispatch: AppDispatch,
  query?: GetBanksQuery
) => {
  try {
    dispatch(setBanksLoading(true));
    dispatch(setBanksError(null));

    const response = await $api.banks.getBanks(query);

    dispatch(commitBanks({ [JSON.stringify(query || {})]: response }));
  } catch (error) {
    dispatch(
      setBanksError(
        error instanceof Error ? error.message : "Failed to fetch banks"
      )
    );
  }
};

export default BanksSlice.reducer;
