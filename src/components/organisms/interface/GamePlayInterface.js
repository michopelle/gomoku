import React from "react";

import "./gamePlayInterface.css";
import Board from "../../Board";
import Reset from "../../Reset";
import UndoRedo from "../../../containers/UndoRedo";
// import "../../App.css";
import WinSide from "../../WinSide";

const GamePlayInterface = ({ api, store }) => {
  const renderedList = () => {
    return (
      <>
        <div className="Board" id="board">
          <Board store={store} api={api} />
        </div>
        <UndoRedo />
        <Reset store={store} api={api} />
        <WinSide />
      </>
    );
  };

  return renderedList();
  // <div className="container">
  //   <div className="table table-borderless">{renderedList()}</div>
  // </div>
};

export default GamePlayInterface;
