import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1D4ED8",
      light: "#697aff",
      dark: "#0027a5",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#0b2253",
      secondary: "#2c4b8a",
      disabled: "#6d7faa",
      // hint: "#6d7faa",
    },
    error: {
      main: "#ca1b1b",
      light: "#ff5845",
      dark: "#910000",
    },
    warning: {
      main: "#d66f0f",
      light: "#ff9e44",
      dark: "#9e4200",
    },
    success: {
      main: "#1e944d",
      light: "#59c57a",
      dark: "#006523",
    },
    info: {
      main: "#1D4ED8",
      light: "#697aff",
      dark: "#0027a5",
    },
    divider: "#DDE5EE",
  },
  typography: {
    fontSize: 1,
    fontWeightLight: 300,
    htmlFontSize: 1,
    fontFamily: '"Karla", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: "3.5rem",
      letterSpacing: "0px",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: "2.5rem",
      letterSpacing: "0.25px",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: "2rem",
      letterSpacing: "0.25px",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: "1.5rem",
      letterSpacing: "0.2px",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      letterSpacing: "0.25px",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      letterSpacing: "0.2px",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      letterSpacing: "0.2px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: "1rem",
      letterSpacing: "0px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      letterSpacing: "-0.05px",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      letterSpacing: "0.04px",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      letterSpacing: "0.2px",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: "1rem",
      letterSpacing: "0.4px",
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      lineHeight: "1rem",
      letterSpacing: "0.2px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};
