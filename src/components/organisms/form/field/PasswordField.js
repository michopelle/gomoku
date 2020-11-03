import React from "react";
import { Field } from "react-final-form";

import {
  composeValidators,
  required,
  containSpecialCharacters,
  contain8Characters,
} from "../validators";

export const PasswordField = () => {
  return (
    <Field
      name="password"
      validate={composeValidators(
        required,
        containSpecialCharacters,
        contain8Characters
      )}
    >
      {({ input, meta }) => (
        <div>
          <label>Password</label>
          <input {...input} type="text" placeholder="Password" />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
