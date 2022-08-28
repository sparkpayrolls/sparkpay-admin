import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../../helpers/api/api";
import {
  GetUsersQueryParams,
  GetUsersResponse,
} from "../../../helpers/api/modules/user/types";
import { ApiResponseWithMeta } from "../../../helpers/api/types";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const UsersSlice = createSlice({
  name: STATE.USERS,
  initialState: {} as Record<string, ApiResponseWithMeta<GetUsersResponse[]>>,
  reducers: {
    commitUsers(
      state,
      action: PayloadAction<
        Record<string, ApiResponseWithMeta<GetUsersResponse[]>>
      >
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { commitUsers } = UsersSlice.actions;

export const getUsers = async (
  dispatch: AppDispatch,
  query: GetUsersQueryParams
) => {
  const response = await $api.appUser.getUsers(query);

  dispatch(commitUsers({ [JSON.stringify(query)]: response }));
};

export default UsersSlice.reducer;
