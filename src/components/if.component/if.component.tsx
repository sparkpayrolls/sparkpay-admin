import { PropsWithChildren } from "react";

export const IF = (props: PropsWithChildren<{ condition?: boolean }>) => {
  const { condition } = props;
  if (!condition) {
    return null;
  }

  return <>{props.children}</>;
};
