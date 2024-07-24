import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AppButton } from "../button.component/button.component";
import { AppTextField } from "../text-field.component/text-field.component";
import { useLoginFormContext } from "./hooks";
import { FormError } from "../form-error.component/form-error.component";

export const LoginForm = () => {
  const {
    error,
    isLoggedIn,
    isSubmitting,
    redirect,
    values,
    clearError,
    handleChange,
    handleSubmit,
  } = useLoginFormContext();

  if (isLoggedIn) {
    return <Navigate replace to={redirect} />;
  }

  return (
    <div>
      <form
        action="#"
        onSubmit={handleSubmit}
        autoComplete="off"
        className="login-form__form"
      >
        <Typography className="login-form__title" variant="h5" component="h1">
          Login
        </Typography>

        <FormError error={error} onClick={clearError} />

        <AppTextField
          type="email"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Email"
          disabled={isSubmitting}
          required
        />

        <AppTextField
          value={values.password}
          name="password"
          onChange={handleChange}
          type="password"
          disabled={isSubmitting}
          placeholder="Password"
          required
        />

        <AppButton
          type="submit"
          variant="contained"
          disableElevation
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Login
        </AppButton>
      </form>
    </div>
  );
};
