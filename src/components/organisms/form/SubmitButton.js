import React from "react";

export const SubmitButton = ({ submitting, errors }) => {
  return (
    <div className="buttons">
      <button
        type="onSubmit"
        disabled={submitting && Object.keys(errors).length}
      />
    </div>
  );
};
