import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { $api } from "../../helpers/api/api";
import { AUTH_TOKEN } from "../../helpers/constants";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { commitUser } from "../../state/reducers/user/user.reducer";

export const useLoginFormContext = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const { isSubmitting, values, handleChange, handleSubmit } = useFormContext({
    async onSubmit(values, helpers) {
      $api.auth
        .login(values)
        .then(({ token, user }) => {
          Cookies.set(AUTH_TOKEN, token);
          $api.registerInterceptors(dispatch);
          dispatch(commitUser(user));
        })
        .finally(() => helpers.setSubmitting(false))
        .catch((error) => {
          setError(error.message);
        });
    },
    initialValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(setError, 6000, "");

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return {
    error,
    isLoggedIn: !!user,
    isSubmitting,
    redirect: searchParams.get("redirect") || "/",
    values,
    clearError() {
      setError("");
    },
    handleChange,
    handleSubmit,
  };
};
