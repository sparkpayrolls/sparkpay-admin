import * as Yup from "yup";

export const signupInviteValidation = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  company: Yup.string().required(),
  email: Yup.string().email().required(),
});
