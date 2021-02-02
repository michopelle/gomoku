import React from "react";

import "./gamePlayInterface.css";
import Board from "../../Board";

const GamePlayInterface = ({ api, store }) => {
  const renderedList = () => {
    return (
      <>
        <div className="Board" id="board">
          <Board store={store} api={api} />
        </div>
      </>
    );
  };

  return renderedList();
  // <div className="container">
  //   <div className="table table-borderless">{renderedList()}</div>
  // </div>
};

export default GamePlayInterface;
