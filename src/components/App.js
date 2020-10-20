import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import LandingPage from "./screens/LandingPage";
import SignUpPage from "./screens/SignUpPage";
import SignInPage from "./screens/SignInPage";
import GamePlayPage from "./screens/GamePlayPage";
import * as routes from "../constants/routes";
import { useDispatch } from "react-redux";

// replace (_) with (firebase) when necessary
const App = (_) => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />

        <div>
          <Route path={routes.LANDING} exact component={LandingPage} />
          <Route path={routes.SIGN_UP} exact component={SignUpPage} />
          <Route path={routes.SIGN_IN} exact component={SignInPage} />
          <Route path={routes.GAME_PLAY} exact component={GamePlayPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
