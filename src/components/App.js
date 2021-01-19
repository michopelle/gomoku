import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactReduxContext } from "react-redux";

import { FirebaseContext } from "../firebase/firebase";
import LandingPage from "./screens/LandingPage";

// replace (_) with (firebase) when necessary
const App = (_) => {
  return (
    <BrowserRouter>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <FirebaseContext.Consumer>
            {({ api }) => <LandingPage api={api} store={store} />}
          </FirebaseContext.Consumer>
        )}
      </ReactReduxContext.Consumer>
    </BrowserRouter>
  );
};

export default App;
