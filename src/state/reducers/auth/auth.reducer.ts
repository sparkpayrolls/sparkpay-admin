import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATE } from "../../../helpers/constants";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { AuthToken } from "../../../types";
import { AppDispatch } from "../../store";
import { $api } from "../../../helpers/api/api";

export const AuthTokensSlice = createSlice({
  name: STATE.AUTH_TOKENS,
  initialState: {} as Record<string, ApiResponseWithMeta<AuthToken[]>>,
  reducers: {
    commitAuthTokens(
      state,
      action: PayloadAction<Record<string, ApiResponseWithMeta<AuthToken[]>>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitAuthTokens } = AuthTokensSlice.actions;

export const getAuthTokens = async (dispatch: AppDispatch, query: unknown) => {
  const response = await $api.adminAuth.getSignupInviteTokens(query);

  dispatch(commitAuthTokens({ [JSON.stringify(query)]: response }));
};

export default AuthTokensSlice.reducer;
