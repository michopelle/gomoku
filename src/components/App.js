import React from "react";

import Board from "./Board";
import UndoRedo from "../containers/UndoRedo";
import "./App.css";
import WinSide from "./WinSide";

const App = () => {
  return (
    <div className="ui container">
      <div className="table table-borderless">
        <div className="">
          <div className="Board">
            <Board />
          </div>
          <UndoRedo />
          <WinSide />
          {/* <div className="col-4">
            <Board />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default App;
