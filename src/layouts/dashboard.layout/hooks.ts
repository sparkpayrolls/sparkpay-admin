import { useState } from "react";
import { Util } from "../../helpers/util/util";
import { DashboardLayoutProps } from "./types";

export const useDashboardLayoutContext = (props: DashboardLayoutProps) => {
  const { className, loading, ...divProps } = props;
  const [side, setSide] = useState({
    show: false,
    remove: true,
  });

  const handleOpenSideClick = () => {
    setSide({ show: false, remove: false });
    setTimeout(setSide, 0, { show: true, remove: false });
  };

  const handleCloseSideClick = () => {
    setSide({ show: false, remove: false });
    setTimeout(setSide, 200, { show: false, remove: true });
  };

  const classNames = Util.classNames("dashboard-layout", className);
  const sideClassNames = Util.classNames("dashboard-layout__side", {
    "dashboard-layout__side--show": side.show,
    "d-none": side.remove,
  });

  return {
    classNames,
    divProps,
    loading,
    sideClassNames,
    handleCloseSideClick,
    handleOpenSideClick,
  };
};
