import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { FirebaseContext } from "../firebase/firebase";
import Header from "./Header";
import LandingPage from "./screens/LandingPage";
import GamePlayPage from "./screens/GamePlayPage";
import * as routes from "../constants/routes";

// replace (_) with (firebase) when necessary
const App = (_) => {
  const [name, setName] = useState("");
  console.log(name);
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />

        <div className="ui container">
          {/* <Route path={routes.LANDING} exact> */}
          <FirebaseContext.Consumer>
            {({ api }) => <LandingPage api={api} />}
          </FirebaseContext.Consumer>
          {/* </Route> */}
          {/* <Route path={routes.GAME_PLAY} exact component={GamePlayPage} /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
