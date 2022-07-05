import { LinearProgress } from "@mui/material";
import cancel from "../../assets/svgs/cancel.svg";
import menu from "../../assets/svgs/menu.svg";
import { IF } from "../../components/if.component/if.component";
import { SideBar } from "../../components/sidebar.component/sidebar.component";
import { useDashboardLayoutContext } from "./hooks";
import { DashboardLayoutProps } from "./types";

export const DashboardLayout = (props: DashboardLayoutProps) => {
  const {
    classNames,
    divProps,
    loading,
    sideClassNames,
    handleCloseSideClick,
    handleOpenSideClick,
  } = useDashboardLayoutContext(props);

  return (
    <div {...divProps} className={classNames}>
      <IF condition={loading}>
        <LinearProgress />
      </IF>
      <div className={sideClassNames}>
        <div
          onClick={handleCloseSideClick}
          className="dashboard-layout__side-content-overlay"
        ></div>
        <button
          onClick={handleCloseSideClick}
          className="dashboard-layout__close-button"
        >
          <img src={cancel} alt="Close menu icon" />
        </button>
        <div className="dashboard-layout__side-content">
          <SideBar />
        </div>
      </div>
      <div className="dashboard-layout__main">
        <div className="dashboard-layout__header">
          <button
            onClick={handleOpenSideClick}
            className="dashboard-layout__open-button"
          >
            <img src={menu} alt="Open menu icon" />
          </button>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
