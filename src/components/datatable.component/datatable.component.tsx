import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Popover,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { IF } from "../if.component/if.component";
import { AppTable } from "../table.component/table.component";
import { TableMoreCellOption } from "../table.component/types";
import { useDataTableContext } from "./hooks";
import { DataTableProps } from "./types";

export const DataTable = (props: DataTableProps) => {
  const {
    count,
    data = [],
    filterContent,
    headRow,
    rowsPerPage,
    rowsPerPageOptions = [10, 100, 1000, { value: -1, label: "All" }],
    shouldRefresh,
    title,
    toolBarContent,
    onRowsPerPageChange,
    refresh,
  } = props;
  const {
    anchorEl,
    page,
    closeFilterPopover,
    onPageChange,
    showFilterPopover,
  } = useDataTableContext(props);

  return (
    <Box>
      <IF condition={!!data.length || !shouldRefresh}>
        <AppTable>
          <AppTable.Toolbar>
            <IF condition={!!title}>
              <AppTable.Title>{title}</AppTable.Title>
            </IF>

            <AppTable.Tools>
              <IF condition={!!refresh}>
                <AppTable.Button
                  onClick={refresh}
                  endIcon={<RefreshIcon className="table__icon" />}
                >
                  Refresh
                </AppTable.Button>
              </IF>

              <IF condition={!!filterContent}>
                <AppTable.Button
                  onClick={showFilterPopover}
                  endIcon={<TuneIcon className="table__icon" />}
                >
                  Filter
                </AppTable.Button>
                <Popover
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={closeFilterPopover}
                  PaperProps={{ className: "table__filter-popover" }}
                >
                  {filterContent}
                </Popover>
              </IF>

              {toolBarContent}
            </AppTable.Tools>
          </AppTable.Toolbar>

          <AppTable.Container>
            <AppTable.Table>
              <TableHead>
                <TableRow>
                  {headRow.map((cell, i) => {
                    const align = i >= headRow.length - 1 ? "right" : "left";
                    const label = cell?.hasOwnProperty("label")
                      ? (cell as any)["label"]
                      : cell;

                    return (
                      <TableCell align={align} key={`${label}_${i}`}>
                        {label}
                      </TableCell>
                    );
                  })}
                  <TableCell padding="none"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((items, i) => {
                  const { cells, moreOptions } = items;

                  return (
                    <TableRow key={`items_${i}`} hover>
                      {cells.map((cell, i) => {
                        const align = i >= cells.length - 1 ? "right" : "left";
                        const label = cell?.hasOwnProperty("label")
                          ? (cell as any)["label"]
                          : cell;

                        return (
                          <TableCell
                            key={`${label}__${i}`}
                            component="th"
                            scope="row"
                            align={align}
                          >
                            {label}
                          </TableCell>
                        );
                      })}
                      <IF condition={!!moreOptions?.length}>
                        <AppTable.MoreCell
                          options={moreOptions as TableMoreCellOption[]}
                        />
                      </IF>
                      <IF condition={!moreOptions?.length}>
                        <TableCell padding="none"></TableCell>
                      </IF>
                    </TableRow>
                  );
                })}
              </TableBody>
            </AppTable.Table>
          </AppTable.Container>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </AppTable>
      </IF>
      <Snackbar
        open={shouldRefresh}
        message="Error loading data"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        action={
          <Button color="secondary" size="small" onClick={refresh}>
            Refresh
          </Button>
        }
      />
    </Box>
  );
};
