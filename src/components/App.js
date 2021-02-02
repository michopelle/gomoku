import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactReduxContext } from "react-redux";

import "./App.css";
import { FirebaseContext } from "../firebase/firebase";
import { Footer } from "./Footer";
import LandingPage from "./screens/LandingPage";

// replace (_) with (firebase) when necessary
const App = (_) => {
  return (
    <div className="wrapper">
      <div className="body">
        <BrowserRouter>
          <ReactReduxContext.Consumer>
            {({ store }) => (
              <FirebaseContext.Consumer>
                {({ api }) => <LandingPage api={api} store={store} />}
              </FirebaseContext.Consumer>
            )}
          </ReactReduxContext.Consumer>
        </BrowserRouter>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
