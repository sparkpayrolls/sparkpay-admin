import React, { useState, useMemo } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { themeOptions } from "../../helpers/theme-options";

const StyledSelect = styled(Select)({
  borderRadius: themeOptions.shape?.borderRadius ?? 0 / 2,
});

const StyledMenuItem = styled(MenuItem)({
  borderRadius: themeOptions.shape?.borderRadius ?? 0 / 2,
});

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (value: { target: { name: string; value: string } }) => void;
  options: Array<{ id: string; name: string; [key: string]: any }>;
  searchPlaceholder?: string;
  noOptionsText?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  options,
  searchPlaceholder = "Search...",
  noOptionsText = "No options found",
  loading = false,
  disabled = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    return options.filter((option) =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    onChange?.({ target: { name, value: selectedValue } });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      setSearchQuery("");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchQuery(""); // Clear search when closing
  };

  return (
    <StyledSelect
      label={label}
      placeholder={placeholder}
      name={name}
      value={value || ""}
      onChange={handleSelectChange}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      displayEmpty
      disabled={disabled}
      renderValue={(selected: unknown) => {
        if (!selected) {
          return <Typography color="textSecondary">{placeholder}</Typography>;
        }
        const selectedOption = options.find((option) => option.id === selected);
        return selectedOption?.name || String(selected);
      }}
    >
      {/* Search input */}
      <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyDown(e);
          }}
        />
      </Box>

      {/* Options */}
      {loading ? (
        <StyledMenuItem disabled>
          <Typography color="textSecondary">Loading...</Typography>
        </StyledMenuItem>
      ) : filteredOptions.length === 0 ? (
        <StyledMenuItem disabled>
          <Typography color="textSecondary">
            {searchQuery.trim()
              ? `No banks found for "${searchQuery}"`
              : noOptionsText}
          </Typography>
        </StyledMenuItem>
      ) : (
        filteredOptions.map((option) => (
          <StyledMenuItem key={option.id} value={option.id}>
            {option.name}
          </StyledMenuItem>
        ))
      )}
    </StyledSelect>
  );
};
