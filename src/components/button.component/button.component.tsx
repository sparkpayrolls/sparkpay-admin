import {
  Button,
  ButtonTypeMap,
  CircularProgress,
  ExtendButtonBaseTypeMap,
} from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { Util } from "../../helpers/util/util";

export function AppButton(
  props: DefaultComponentProps<
    ExtendButtonBaseTypeMap<
      ButtonTypeMap<{ loading?: boolean; loadingColor?: any }, "button">
    >
  >
) {
  const { children, loading, loadingColor, ...buttonProps } = props;
  const className = Util.classNames(props.className, "app-button");

  if (loading) {
    return (
      <Button {...buttonProps} className={className}>
        <CircularProgress
          className="app-button__progress"
          color={loadingColor}
        />
      </Button>
    );
  }

  return <Button {...buttonProps} children={children} className={className} />;
}
