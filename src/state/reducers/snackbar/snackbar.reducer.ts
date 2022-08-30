import { SnackbarProps } from "@mui/material";
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { STATE } from "../../../helpers/constants";
import { AppDispatch } from "../../store";

export const SnackbarSlice = createSlice<
  SnackbarProps,
  SliceCaseReducers<SnackbarProps>
>({
  name: STATE.SNACKBAR,
  initialState: {
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    autoHideDuration: 3000,
    draggable: true,
  },
  reducers: {
    commitSnackbar(state, action: PayloadAction<SnackbarProps>) {
      return Object.assign({}, state, action.payload);
    },
  },
});

export const { commitSnackbar } = SnackbarSlice.actions;

let dispatch: AppDispatch | null = null;
export const snackbar = (props: SnackbarProps) => {
  if (dispatch) {
    props.onClose = () => snackbar({ open: false });
    dispatch(commitSnackbar(props));
  }
};

snackbar.register = (_dispatch: AppDispatch) => {
  dispatch = _dispatch;
};

export default SnackbarSlice.reducer;
