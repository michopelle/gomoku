import React from "react";
import { FirebaseContext } from "./firebase";

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {/* {console.log(props.firebase)} */}
    {({ api }) => <Component {...props} api={api} />}
  </FirebaseContext.Consumer>
);
