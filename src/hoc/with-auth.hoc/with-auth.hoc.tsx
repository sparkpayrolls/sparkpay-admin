import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";

export const WithAuth = <T extends Record<string, unknown>>(
  Comp: React.ComponentType<T>
) => {
  const Wrapper: React.ComponentType<T> = (props) => {
    const user = useAppSelector((state) => state.user);
    if (!user) {
      return (
        <Navigate replace to={`/login?redirect=${window.location.pathname}`} />
      );
    }

    return <Comp {...props} />;
  };

  return Wrapper;
};
