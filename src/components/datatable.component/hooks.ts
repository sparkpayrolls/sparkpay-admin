import { useState } from "react";

export const useDataTableContext = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const showFilterPopover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterPopover = () => setAnchorEl(null);

  return { anchorEl, closeFilterPopover, showFilterPopover };
};
