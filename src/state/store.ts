import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { config } from "../helpers/config";
import banks from "./reducers/banks/banks.reducer";
import companies from "./reducers/companies/companies.reducer";
import dashboard from "./reducers/dashboard/dashboard.reducer";
import user from "./reducers/user/user.reducer";
import users from "./reducers/users/users.reducer";
import snackbar from "./reducers/snackbar/snackbar.reducer";
import transfers from "./reducers/transfers/transfers.reducer";
import payrollEmployees from "./reducers/payroll-employees/payroll-employee.reducer";
import payrolls from "./reducers/payrolls/payroll.reducer";
import authTokens from "./reducers/auth/auth.reducer";
import statutoryPayments from "./reducers/statutory-payments/statutory-payments.reducer";

const reducers = combineReducers({
  banks,
  companies,
  dashboard,
  user,
  users,
  snackbar,
  transfers,
  payrollEmployees,
  payrolls,
  authTokens,
  statutoryPayments,
});
const persistedReducers = persistReducer(
  { key: "root", storage, blacklist: ["snackbar"] },
  reducers
);

export const store = configureStore({
  reducer: persistedReducers,
  devTools: config().isDev(),
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
      },
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
