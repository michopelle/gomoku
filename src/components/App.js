import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import GamePlayPage from "./GamePlayPage";
import * as routes from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { SetAuthUserAndUploadReducers } from "../actions";

const App = ({ api }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   api.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       dispatch(SetAuthUserAndUploadReducers);
  //     }
  //   });
  // });

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
