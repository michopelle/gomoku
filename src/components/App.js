import React from "react";

import Board from "./Board";
import Reset from "./Reset";
import UndoRedo from "../containers/UndoRedo";
import "./App.css";
import WinSide from "./WinSide";
import { FirebaseContext } from "../firebase/firebase";
import { ReactReduxContext } from "react-redux";

const App = () => {
  const renderedList = ({ store, api, database }) => {
    return (
      <div>
        <div className="Board">
          <Board store={store} api={api} database={database} />
        </div>
        <UndoRedo />
        <Reset store={store} api={api} database={database} />
        <WinSide />
      </div>
    );
  };

  return (
    <div className="ui container">
      <div className="table table-borderless">
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <FirebaseContext.Consumer>
              {({ api, database }) => {
                return renderedList({ store, api, database });
              }}
            </FirebaseContext.Consumer>
          )}
        </ReactReduxContext.Consumer>
      </div>
    </div>
  );
};

export default App;
