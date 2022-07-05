import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  TableContainer,
  Table as T,
  Toolbar,
  Typography,
  TableCell,
  IconButton,
  Popover,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { Util } from "../../helpers/util/util";
import { AppButton } from "../button.component/button.component";
import { TableMoreCellProps } from "./types";

export const AppTable = (props: PropsWithChildren<{}>) => {
  return <Box>{props.children}</Box>;
};

AppTable.Toolbar = (props: PropsWithChildren<{}>) => {
  return <Toolbar>{props.children}</Toolbar>;
};

AppTable.Title = (props: PropsWithChildren<{}>) => {
  return (
    <Typography variant="h6" component="h1">
      {props.children}
    </Typography>
  );
};

AppTable.Tools = (props: PropsWithChildren<{}>) => {
  return <Box className="table__toolbar-tools">{props.children}</Box>;
};

const TableButton: typeof AppButton = (props) => {
  const className = Util.classNames(props.className, "table__tool-bar-button");

  return <AppButton {...props} variant="outlined" className={className} />;
};

AppTable.Button = TableButton;

AppTable.Container = (props: PropsWithChildren<{}>) => {
  return (
    <TableContainer className="table__container">
      {props.children}
    </TableContainer>
  );
};

AppTable.Table = (props: PropsWithChildren<{}>) => {
  return <T stickyHeader>{props.children}</T>;
};

const TableMoreCell = (props: TableMoreCellProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell padding="none" align="left">
      <IconButton onClick={handleClick}>
        <MoreVertIcon className="table__icon" />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
        PaperProps={{ className: "table__popover" }}
      >
        <Box className="table__popover-content">
          {props.options.map((option) => {
            return (
              <AppButton
                onClick={(event) => {
                  setAnchorEl(null);
                  if (option.onClick) {
                    option.onClick(event);
                  }
                }}
                className="table__popover-item"
                href={`#${option.label}`}
                key={option.label}
              >
                {option.label}
              </AppButton>
            );
          })}
        </Box>
      </Popover>
    </TableCell>
  );
};

AppTable.MoreCell = TableMoreCell;
