import React from "react";

import "./field/field.css";
import "./formStyle.css";

export const StartButton = ({ onClick, opponentDisplayName }) => {
  // console.log(
  //   "from start button",
  //   `startButton${opponentDisplayName ? "Disabled" : ""}`
  // );
  return (
    <div className="buttons">
      <button
        id={`startButton${!opponentDisplayName ? "Disabled" : ""}`}
        type="onSubmit"
        // disabled={!opponentDisplayName}
        onClick={() => onClick()}
      >
        Start
      </button>
    </div>
  );
};
