import React, { useContext, useEffect } from "react";

import Board from "./Board";
import UndoRedo from "../containers/UndoRedo";
import "./App.css";
import WinSide from "./WinSide";
import { FirebaseContext } from "../firebase/firebase";
import { useSelector, useStore } from "react-redux";

const App = () => {
  const { api, database } = useContext(FirebaseContext);

  const chests = useSelector((state) => state.chests);
  const side = useSelector((state) => state.side);
  const winSide = useSelector((state) => state.winSide);

  const store = useStore();
  store.subscribe(() => api.uploadReducers(store.getState(), database));

  // Same as componentDidMount, to upload all reducers to firebase
  // when the App has been redendered
  useEffect(() => {
    // api.uploadReducers(chests, side, winSide);
  });

  return (
    <div className="ui container">
      <div className="table table-borderless">
        <div className="">
          <div className="Board">
            <Board />
          </div>
          <UndoRedo />
          <WinSide />
        </div>
      </div>
    </div>
  );
};

export default App;
