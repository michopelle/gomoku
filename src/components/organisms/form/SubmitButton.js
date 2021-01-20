import React from "react";

import "./field/field.css";

export const SubmitButton = ({ submitting, errors }) => {
  return (
    <div className="buttons">
      <button
        id="submitButton"
        className="btn btn-success"
        type="onSubmit"
        disabled={submitting && Object.keys(errors).length}
      >
        Submit
      </button>
    </div>
  );
};
