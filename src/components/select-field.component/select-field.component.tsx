import { MenuItem, Select } from "@mui/material";
import styled from "@emotion/styled";
import { themeOptions } from "../../helpers/theme-options";

export const AppSelect = styled(Select)({
  borderRadius: themeOptions.shape?.borderRadius ?? 0 / 2,
});

export const AppSelectMenuItem = styled(MenuItem)({
  borderRadius: themeOptions.shape?.borderRadius ?? 0 / 2,
});
