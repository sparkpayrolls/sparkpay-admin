import TuneIcon from "@mui/icons-material/Tune";
import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Snackbar,
  Button,
  Popover,
  Select,
  MenuItem,
  ListItemText,
  FormControl,
  InputLabel,
  Box,
  TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { IF } from "../../components/if.component/if.component";
import { AppTable } from "../../components/table.component/table.component";
import { Util } from "../../helpers/util/util";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { usePayrollTransfersPageContext } from "./hooks";

function _PayrollTransfersPage() {
  const {
    anchorEl,
    apiResponse,
    loading,
    params,
    shouldRefresh,
    rowsPerPageOptions,
    statusItems,
    values,
    closeFilterPopover,
    getCustomChangeHandler,
    getTransferOptions,
    handleChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSubmit,
    refresh,
    reset,
    showFilterPopover,
    transformDateValue,
  } = usePayrollTransfersPageContext();

  const snackbar = (
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
  );

  if (!apiResponse) {
    return <DashboardLayout loading={loading}>{snackbar}</DashboardLayout>;
  }

  return (
    <DashboardLayout loading={loading}>
      <AppTable>
        <AppTable.Toolbar>
          <AppTable.Title>
            {Util.formatMoneyNumber(apiResponse.meta.total, 0)} Payroll
            employees
          </AppTable.Title>
          <AppTable.Tools>
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
              <form onSubmit={handleSubmit}>
                <FormControl size="small" sx={{ mb: 2, width: "100%" }}>
                  <InputLabel size="small" id="status">
                    Status
                  </InputLabel>
                  <Select
                    labelId="status"
                    label="Status"
                    size="small"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    multiple
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {statusItems.map((item) => {
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          <Checkbox size="small" checked={item.checked} />
                          <ListItemText primary={item.label} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ mb: 3, width: "100%" }}>
                  <InputLabel size="small" id="date-period">
                    Date Period
                  </InputLabel>
                  <Select
                    labelId="date-period"
                    label="Date Period"
                    size="small"
                    name="datePeriod"
                    value={values.datePeriod}
                    onChange={handleChange}
                  >
                    <MenuItem value="">All time</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="specific-day">Specific Day</MenuItem>
                    <MenuItem value="custom-period">Custom Period</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <IF condition={values.datePeriod === "specific-day"}>
                      <DesktopDatePicker
                        label="Pick Date"
                        inputFormat="MM/DD/yyyy"
                        value={values.date}
                        onChange={getCustomChangeHandler(
                          "date",
                          transformDateValue
                        )}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            {...params}
                          />
                        )}
                      />
                    </IF>

                    <IF condition={values.datePeriod === "custom-period"}>
                      <Box display="flex" gap={1}>
                        <DesktopDatePicker
                          label="Start Date"
                          inputFormat="MM/DD/yyyy"
                          value={values.startDate}
                          onChange={getCustomChangeHandler(
                            "startDate",
                            transformDateValue
                          )}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />

                        <DesktopDatePicker
                          label="End Date"
                          inputFormat="MM/DD/yyyy"
                          value={values.endDate}
                          onChange={getCustomChangeHandler(
                            "endDate",
                            transformDateValue
                          )}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </Box>
                    </IF>
                  </LocalizationProvider>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ mt: 4 }}
                >
                  <Button onClick={reset} size="small" variant="outlined">
                    Reset
                  </Button>

                  <Button type="submit" size="small" variant="contained">
                    Apply Filter
                  </Button>
                </Box>
              </form>
            </Popover>
          </AppTable.Tools>
        </AppTable.Toolbar>
        <AppTable.Container>
          <AppTable.Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Satus</TableCell>
                <TableCell align="left">Remark</TableCell>
                <TableCell align="right">Date Created</TableCell>
                <TableCell padding="none"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiResponse.data.map((item) => {
                const transferFailed = item.payoutStatus === "failed";
                const { firstname, lastname } = item.employee || {};

                return (
                  <TableRow key={item.id} hover>
                    <TableCell component="th" scope="row">
                      {firstname} {lastname}
                    </TableCell>
                    <TableCell align="left">{item.company?.name}</TableCell>
                    <TableCell align="left">
                      {item.country?.currencySymbol}{" "}
                      {Util.formatMoneyNumber(item.netSalary)}
                    </TableCell>
                    <TableCell align="left">{item.payoutStatus}</TableCell>
                    <TableCell align="left">{item.remark}</TableCell>
                    <TableCell align="right">
                      {moment(item.createdAt).format("MMMM DD, YYYY")}
                    </TableCell>
                    <IF condition={transferFailed}>
                      <AppTable.MoreCell options={getTransferOptions(item)} />
                    </IF>
                    <IF condition={!transferFailed}>
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
          count={apiResponse.meta.total}
          rowsPerPage={params.limit}
          page={params.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </AppTable>
      {snackbar}
    </DashboardLayout>
  );
}

const PayrollTransfersPage = WithAuth(_PayrollTransfersPage);

export default PayrollTransfersPage;
