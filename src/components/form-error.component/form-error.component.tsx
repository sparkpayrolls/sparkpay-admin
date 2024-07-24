import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, IconButton } from "@mui/material";
import { FormErrorProps } from "./types";

export const FormError = (props: FormErrorProps) => {
  const { error, onClick } = props;

  return (
    <Collapse in={!!error}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity="error"
      >
        {error}
      </Alert>
    </Collapse>
  );
};
