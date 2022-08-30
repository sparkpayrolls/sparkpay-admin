import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/svgs/logo.svg";
import { useAppContext } from "./hooks";
import CompaniesPage from "./pages/companies.page/companies.page";
import IndexPage from "./pages/index/index.page";
import LoginPage from "./pages/login.page/login.page";
import PayrollTransfersPage from "./pages/payroll-transfers.page/payroll-transfers.page";
import TransfersPage from "./pages/transfers.page/transfers.page";
import UsersPage from "./pages/users.page/users.page";
import { useAppSelector } from "./state/hooks";

function App() {
  const { progress, SETUP_STEPS } = useAppContext();
  const snackbar = useAppSelector((state) => state.snackbar);

  if (SETUP_STEPS > progress) {
    return (
      <Box className="fullscreen-loader">
        <img src={logo} className="fullscreen-loader__logo" alt="app logo" />
        <CircularProgress
          className="fullscreen-loader__progress"
          variant="determinate"
          value={(progress / SETUP_STEPS) * 100}
        />
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transfers" element={<TransfersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/payroll-employees" element={<PayrollTransfersPage />} />
          <Route path="*" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>
      <Snackbar {...snackbar} />
    </>
  );
}

export default App;
