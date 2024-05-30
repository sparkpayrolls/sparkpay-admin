import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { IF } from "../../components/if.component/if.component";
import { PayrollEmployeeTableFilterContentProps } from "./types";
import moment from "moment";

export const PayrollEmployeeTableFilterContent = (
  props: PayrollEmployeeTableFilterContentProps
) => {
  const { getCustomChangeHandler, handleChange, handleSubmit, reset, values } =
    props.formContext;
  const {
    transformDateValue = (value: moment.Moment | null) => value?.toDate(),
    statuses,
  } = props;
  const statusItems = statuses?.map((status) => ({
    value: status,
    label: status,
    checked: values.status.includes(status),
  })) || [
    {
      value: "failed",
      label: "Failed",
      checked: values.status.includes("failed"),
    },
    {
      value: "successful",
      label: "Successful",
      checked: values.status.includes("successful"),
    },
    {
      value: "pending",
      label: "Pending",
      checked: values.status.includes("pending"),
    },
    {
      value: "processing",
      label: "Processing",
      checked: values.status.includes("processing"),
    },
  ];

  return (
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
              onChange={getCustomChangeHandler("date", transformDateValue)}
              renderInput={(params) => (
                <TextField sx={{ width: "100%" }} size="small" {...params} />
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
                renderInput={(params) => <TextField size="small" {...params} />}
              />

              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/yyyy"
                value={values.endDate}
                onChange={getCustomChangeHandler("endDate", transformDateValue)}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Box>
          </IF>
        </LocalizationProvider>
      </Box>

      <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button onClick={reset} size="small" variant="outlined">
          Reset
        </Button>

        <Button type="submit" size="small" variant="contained">
          Apply Filter
        </Button>
      </Box>
    </form>
  );
};
