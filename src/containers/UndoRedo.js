import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

const UndoRedo = ({}) => {
  return (
    <p>
      <button>Undo</button>
      <button>Redo</button>
    </p>
  );
};
export default UndoRedo;
