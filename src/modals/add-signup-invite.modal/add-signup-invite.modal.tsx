import NiceModal from "@ebay/nice-modal-react";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";
import { Formik } from "formik";
import { signupInviteValidation } from "../../helpers/validations";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import { AppTextField } from "../../components/text-field.component/text-field.component";
import { AppButton } from "../../components/button.component/button.component";
import { useAddSignupInviteModal } from "./hooks";
import { FormError } from "../../components/form-error.component/form-error.component";

export const AddSignupInviteModal = NiceModal.create(() => {
  return (
    <ModalLayout title="Create Invite Token">
      {(modal) => {
        const { handleSubmit, initialValues, error, clearError } =
          useAddSignupInviteModal(modal);

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={signupInviteValidation}
            onSubmit={handleSubmit}
          >
            {(props) => {
              const {
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              } = props;

              return (
                <form onSubmit={handleSubmit}>
                  <FlexBox.Column gap={4}>
                    <FormError error={error} onClick={clearError} />

                    <AppTextField
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      label="First Name"
                      placeholder="First Name"
                    />

                    <AppTextField
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                      label="Last Name"
                      placeholder="Last Name"
                    />

                    <AppTextField
                      error={touched.company && !!errors.company}
                      helperText={touched.company && errors.company}
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="company"
                      label="Company"
                      placeholder="Company"
                    />

                    <AppTextField
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      label="Email"
                      placeholder="Email"
                    />

                    <AppButton
                      type="submit"
                      variant="contained"
                      disableElevation
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Create Invite Token
                    </AppButton>
                  </FlexBox.Column>
                </form>
              );
            }}
          </Formik>
        );
      }}
    </ModalLayout>
  );
});
