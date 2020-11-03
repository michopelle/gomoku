import React from "react";
import { Field } from "react-final-form";

import { composeValidators, required, containEmail } from "../validators";

export const EmailField = () => {
  return (
    <Field name="email" validate={composeValidators(required, containEmail)}>
      {({ input, meta }) => (
        <div>
          <label>Email</label>
          <input {...input} type="text" placeholder="email" />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
