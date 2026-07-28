import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { AppButton } from "../../components/button.component/button.component";
import { FlexBox } from "../../components/flexbox/flexbox.component";
import { FormError } from "../../components/form-error.component/form-error.component";
import { AppTextField } from "../../components/text-field.component/text-field.component";
import { $api } from "../../helpers/api/api";
import { HttpError } from "../../helpers/api/modules/base/http.error";
import { ModalLayout } from "../../layouts/modal.layout/modal.layout";

const validation = Yup.object().shape({
  meetingLink: Yup.string()
    .url("Enter a valid URL (https://…)")
    .required("A meeting link is required"),
});

type ConfirmDemoBookingModalProps = { id: string; reference: string };

export const ConfirmDemoBookingModal = NiceModal.create<ConfirmDemoBookingModalProps>(
  ({ id, reference }) => {
    const modal = useModal();
    const [error, setError] = useState("");

    return (
      <ModalLayout title={`Confirm booking ${reference}`}>
        {() => (
          <Formik
            initialValues={{ meetingLink: "" }}
            validationSchema={validation}
            onSubmit={async (values, helpers) => {
              setError("");
              try {
                await $api.demoBooking.confirm(id, values.meetingLink);
                modal.resolve(true);
                modal.hide();
              } catch (e) {
                setError(
                  (e as HttpError)?.message ||
                    "Could not confirm the booking. Please try again."
                );
              } finally {
                helpers.setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <FlexBox.Column gap={4}>
                  <FormError error={error} onClick={() => setError("")} />

                  <p style={{ margin: 0, fontSize: 14, color: "#5a6478" }}>
                    Paste the Google Meet (or other) link. The prospect will get
                    a confirmation email with this link and a calendar invite.
                  </p>

                  <AppTextField
                    name="meetingLink"
                    label="Meeting link"
                    placeholder="https://meet.google.com/abc-defg-hij"
                    value={values.meetingLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.meetingLink && !!errors.meetingLink}
                    helperText={touched.meetingLink && errors.meetingLink}
                  />

                  <AppButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Confirming…" : "Confirm & send invite"}
                  </AppButton>
                </FlexBox.Column>
              </form>
            )}
          </Formik>
        )}
      </ModalLayout>
    );
  }
);
