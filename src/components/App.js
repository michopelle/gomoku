import React from "react";
import { BrowserRouter } from "react-router-dom";

import { FirebaseContext } from "../firebase/firebase";
import Header from "./Header";
import LandingPage from "./screens/LandingPage";

// replace (_) with (firebase) when necessary
const App = (_) => {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <FirebaseContext.Consumer>
        {({ api }) => <LandingPage api={api} />}
      </FirebaseContext.Consumer>
    </BrowserRouter>
  );
};

export default App;
