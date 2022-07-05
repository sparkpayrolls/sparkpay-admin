export type Helpers = {
  setSubmitting(isSubmitting: boolean): void;
  reset(): void;
};

export type UseFormContextParams<T> = {
  initialValues: T;
  onSubmit(values: T, helpers: Helpers): unknown;
};

export type TransformCustomChangeHandlerValue<T> = (value: T) => unknown;
