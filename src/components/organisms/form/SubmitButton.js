import React from "react";

import "./field/field.css";

export const SubmitButton = ({ submitting, errors }) => {
  return (
    <div className="buttons">
      <button
        id="submitButton"
        type="onSubmit"
        disabled={submitting && Object.keys(errors).length}
      >
        Submit
      </button>
    </div>
  );
};
