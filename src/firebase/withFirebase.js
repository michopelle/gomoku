import React from "react";
import { FirebaseContext } from "./firebase";

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {({ api }) => <Component {...props} api={api} />}
  </FirebaseContext.Consumer>
);
