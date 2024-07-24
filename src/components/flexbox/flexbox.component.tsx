import Box from "@mui/material/Box";

type BoxProps = Parameters<typeof Box>[0];

export const FlexBox = (props: BoxProps) => {
  return <Box {...props} />;
};

FlexBox.Row = (props: BoxProps) => {
  return <Box sx={{ display: "flex", flexDirection: "row" }} {...props} />;
};

FlexBox.Column = (props: BoxProps) => {
  return <Box sx={{ display: "flex", flexDirection: "column" }} {...props} />;
};
