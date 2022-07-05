import logo_white from "../../assets/svgs/logo-white.svg";
import { Util } from "../../helpers/util/util";
import { AuthLayoutProps } from "./types";

export const AuthLayout = (props: AuthLayoutProps) => {
  const { className } = props;
  const classNames = Util.classNames("auth-layout", className);

  return (
    <div {...props} className={classNames}>
      <div className="auth-layout__header">
        <img src={logo_white} className="auth-layout__logo" alt="logo" />
      </div>

      <div>{props.children}</div>
    </div>
  );
};
