import React from "react";
import { Field } from "react-final-form";

import "./field.css";
import {
  composeValidators,
  required,
  containSpecialCharacters,
} from "../validators";

export const DisplayNameField = () => {
  return (
    <Field
      name="displayName"
      validate={composeValidators(required, containSpecialCharacters)}
    >
      {({ input, meta }) => (
        <div className="displayNameInputDiv">
          <input
            id="displayNameInput"
            {...input}
            type="text"
            placeholder="Display Name"
          />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
