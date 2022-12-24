import { useState } from "react";
import { DataTableProps } from "./types";

export const useDataTableContext = (props: DataTableProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { onPageChange: _onPageChange } = props;
  const showFilterPopover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterPopover = () => setAnchorEl(null);

  const onPageChange: typeof _onPageChange = (ev, page) => {
    return _onPageChange(ev, page + 1);
  };

  return { anchorEl, closeFilterPopover, onPageChange, showFilterPopover };
};
