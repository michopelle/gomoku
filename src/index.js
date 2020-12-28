import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import firebase from "firebase/app";
import App from "./components/App";
import "firebase/auth";
import reducers from "./store/reducers/";
import firebaseConfig from "./firebase/firebaseConfig";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
    <App />
  </FirebaseDatabaseProvider>,
  document.querySelector("#root")
);
