import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AUTH_TOKEN, STATE } from "../../../helpers/constants";
import { User } from "../../../types";
import { AppDispatch } from "../../store";

export const UserSlice = createSlice({
  name: STATE.USER,
  initialState: null as User | null,
  reducers: {
    commitUser(_state, action: PayloadAction<User | null>) {
      return action.payload;
    },
  },
});

export const { commitUser } = UserSlice.actions;

export const logOut = (dispatch: AppDispatch) => {
  Cookies.remove(AUTH_TOKEN);
  dispatch(commitUser(null));
};

export default UserSlice.reducer;
