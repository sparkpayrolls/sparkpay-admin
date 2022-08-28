import GroupIcon from "@mui/icons-material/Group";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo_blue from "../../assets/svgs/logo-blue.svg";
import { Util } from "../../helpers/util/util";
import { useAppDispatch } from "../../state/hooks";
import { logOut } from "../../state/reducers/user/user.reducer";
import { AppButton } from "../button.component/button.component";
import { CategorySVG } from "./svg";

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    logOut(dispatch);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo_blue} alt="SparkPay logo" />
      </div>

      <nav className="sidebar__nav">
        <section className="sidebar__nav-section">
          {/* <h6 className="sidebar__nav-title h100">Section Title</h6> */}
          <NavLink
            to="/"
            className={({ isActive: current }) => Util.classNames({ current })}
          >
            <CategorySVG />
            <Typography component="span">Payroll employees</Typography>
          </NavLink>

          <NavLink
            to="/transfers"
            className={({ isActive: current }) => Util.classNames({ current })}
          >
            <CategorySVG />
            <Typography component="span">Transfers</Typography>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive: current }) => Util.classNames({ current })}
          >
            <GroupIcon />
            <Typography component="span">Users</Typography>
          </NavLink>
        </section>
      </nav>

      <Box className="sidebar__footer">
        <AppButton
          className="sidebar__logout-button"
          startIcon={<PowerSettingsNewIcon />}
          onClick={handleLogoutClick}
        >
          Logout
        </AppButton>
      </Box>
    </div>
  );
};
