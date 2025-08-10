import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useStatutoryPaymentsTableFilterContentContext } from "./hooks";
import { StatutoryPaymentsTableFilterContentProps } from "./types";

export const StatutoryPaymentsTableFilterContent = (
  props: StatutoryPaymentsTableFilterContentProps
) => {
  const { handleChange, handleSubmit, reset, values } = props.formContext;
  const { statusItems, typeItems } =
    useStatutoryPaymentsTableFilterContentContext(values);

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

      <FormControl size="small" sx={{ mb: 2, width: "100%" }}>
        <InputLabel size="small" id="type">
          Type
        </InputLabel>
        <Select
          labelId="type"
          label="Type"
          size="small"
          name="type"
          value={values.type}
          onChange={handleChange}
          multiple
          renderValue={(selected) => selected.join(", ")}
        >
          {typeItems.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                <Checkbox size="small" checked={item.checked} />
                <ListItemText primary={item.label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

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
