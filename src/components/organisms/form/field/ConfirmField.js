import React from "react";
import { Field } from "react-final-form";

import { required } from "../validators";

export const ConfirmField = () => {
  return (
    <Field name="confirm" validate={required}>
      {({ input, meta }) => (
        <div>
          <label>Confirm Password</label>
          <input {...input} type="text" placeholder="Confirm Password" />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
