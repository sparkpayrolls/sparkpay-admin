import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/svgs/logo.svg";
import { useAppContext } from "./hooks";
import CompaniesPage from "./pages/companies.page/companies.page";
import LoginPage from "./pages/login.page/login.page";
import PayrollTransfersPage from "./pages/payroll-transfers.page/payroll-transfers.page";
import TransfersPage from "./pages/transfers.page/transfers.page";
import UsersPage from "./pages/users.page/users.page";

function App() {
  const { progress, SETUP_STEPS } = useAppContext();

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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="*" element={<PayrollTransfersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
