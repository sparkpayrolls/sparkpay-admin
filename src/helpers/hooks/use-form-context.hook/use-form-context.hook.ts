import { SelectChangeEvent } from "@mui/material";
import { useRef, useState } from "react";
import {
  TransformCustomChangeHandlerValue,
  UseFormContextParams,
} from "./types";

export const useFormContext = <T extends Record<string, unknown>>(
  params: UseFormContextParams<T>
) => {
  const { initialValues, onSubmit } = params;
  const _initialValues = useRef(initialValues);
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitting) {
      setSubmitting(true);
      onSubmit(values, { setSubmitting, reset });
    }
  };
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const getCustomChangeHandler = <T>(
    name: string,
    transform: TransformCustomChangeHandlerValue<T> = (value) => value
  ) => {
    return (value: T) => {
      const _value = transform(value);
      setValues({ ...values, [name]: _value });
    };
  };
  const reset = () => {
    setValues(_initialValues.current);
  };

  return {
    isSubmitting,
    values,
    getCustomChangeHandler,
    handleChange,
    handleSubmit,
    setValues,
    reset,
  };
};
