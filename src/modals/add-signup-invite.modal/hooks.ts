import { NiceModalHandler } from "@ebay/nice-modal-react";
import { FormikHelpers } from "formik";
import { $api } from "../../helpers/api/api";
import { useState } from "react";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";

export const useAddSignupInviteModal = (modal: NiceModalHandler) => {
  const [error, setErrorr] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
  };
  const handleSubmit = (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    helpers.setSubmitting(true);

    $api.adminAuth
      .createSignupInviteToken(values)
      .then((resp) => {
        navigator.clipboard.writeText(
          `https://www.sparkpayhq.com/create-account?inviteCode=${resp.data.token}`
        );
        snackbar({
          open: true,
          message: "Invite link copied to clipboard!",
        });
        modal.resolve(resp);
        setTimeout(modal.hide.bind(modal), 5);
      })
      .catch((error) => {
        if (error.status === 422) {
          return helpers.setErrors(error.errors);
        }

        setErrorr(error.message);
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  return {
    handleSubmit,
    initialValues,
    error,
    clearError() {
      setErrorr("");
    },
  };
};
