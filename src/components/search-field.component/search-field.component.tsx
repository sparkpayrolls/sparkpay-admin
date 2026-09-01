import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { IF } from "../if.component/if.component";
import { SearchFieldProps } from "./types";

export const SearchField = (props: SearchFieldProps) => {
  const {
    value = "",
    placeholder = "Search...",
    debounceMs = 400,
    onChange,
  } = props;
  const [term, setTerm] = useState(value);

  // Follow the query when the page resets it - clearing a filter, say.
  useEffect(() => {
    setTerm(value);
  }, [value]);

  const emit = useMemo(
    () => debounce(onChange, debounceMs),
    [onChange, debounceMs]
  );

  // Drop a pending keystroke rather than firing it after unmount.
  useEffect(() => emit.cancel, [emit]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    emit(event.target.value);
  };

  const clear = () => {
    setTerm("");
    emit.cancel();
    onChange("");
  };

  return (
    <TextField
      size="small"
      value={term}
      placeholder={placeholder}
      onChange={onInputChange}
      inputProps={{ "aria-label": placeholder }}
      className="table__search-field"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <IF condition={!!term}>
            <InputAdornment position="end">
              <IconButton size="small" aria-label="Clear search" onClick={clear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          </IF>
        ),
      }}
    />
  );
};
