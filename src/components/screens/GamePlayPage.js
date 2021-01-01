import React from "react";

import Board from "../Board";
import Reset from "../Reset";
import UndoRedo from "../../containers/UndoRedo";
import "../App.css";
import WinSide from "../WinSide";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import "firebase/database"; // this is required

const GamePlayPage = () => {
  return (
    <div className="ui container">
      <div className="table table-borderless">
        <FirebaseDatabaseNode path="/" orderByKey>
          {(d) => {
            return (
              <>
                <div className="Board">
                  <Board data={d.value} />
                </div>
                <UndoRedo />
                <Reset />
                <WinSide />
              </>
            );
          }}
        </FirebaseDatabaseNode>
      </div>
    </div>
  );
};

export default GamePlayPage;
