import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

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

        <div>
          <Route path={routes.LANDING} exact>
            <LandingPage setName={setName} />
          </Route>
          {/* <Route path={routes.SIGN_UP} exact component={SignUpPage} />
          <Route path={routes.SIGN_IN} exact component={SignInPage} /> */}
          <Route path={routes.GAME_PLAY} exact>
            <GamePlayPage name={name} />
          </Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
