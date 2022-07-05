import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { themeOptions } from "../../helpers/theme-options";

export const AppTextField = styled(TextField)({
  borderRadius: themeOptions.shape?.borderRadius ?? 0 / 2,
});
