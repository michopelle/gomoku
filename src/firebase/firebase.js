import React, { createContext } from "react";
import { ReactReduxContext } from "react-redux";
import firebaseConfig from "./firebaseConfig";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";

import { updateData, SetAuthUserAndUploadReducers } from "../actions";

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  let firebase = {
    app: null,
    database: null,
  };

  const dispatch = useDispatch();
  // var firebaseui = require("firebaseui");

  if (!app.apps.length) {
    // Set the configuration for your app
    app.initializeApp(firebaseConfig);
    const auth = app.auth;

    var user = null;

    firebase = {
      app: app,
      // Get a reference to the database service
      database: app.database(),

      api: {
        uploadReducers,
        downloadReducers,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
      },

      auth: auth,

      user: user,
    };
  }

  function createUserWithEmailAndPassword(email, password, username) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((username) => {
        signInWithEmailAndPassword(email, password, username);
        // this.props.firebase.api.uploadReducers();
        // this.props.history.push(routes.LANDING);
      });
  }

  function signInWithEmailAndPassword(email, password, username) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        onAuthStateChanged(username);
      });
  }

  function onAuthStateChanged(username) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var name = user.displayName;
        console.log("name:", name);
        console.log("user:", user);
        console.log("user.Displayname:", user.displayName);
        console.log("user.email:", user.email);
        // console.log("user.getToken:", user.getIdToken();
        console.log("username:", username);
        // user.updateProfile({
        //   displayName: username,
        // });
        dispatch(SetAuthUserAndUploadReducers(username, uploadReducers));
      }
    });
  }

  // fromStore
  function uploadReducers({ authUser, chests, side, winSide }) {
    // call this function whenever sth has to be updated to Firebase
    // the ref() can be used to input the corresponding node name in Firebase
    firebase.database
      .ref()
      .set({
        authUser: authUser,
        chests: chests,
        side: side,
        winSide: winSide,
      })
      .then((doc) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  // fromDb
  function downloadReducers(db) {
    // This method is triggered once when the listener is attached
    // and again every time the data, including children, changes.
    db.ref().on("value", (snapshot) => {
      if (snapshot.val()) {
        const { chests, side, winSide } = snapshot.val();
        dispatch(updateData(chests, side, winSide));
      }
    });
  }
  downloadReducers(firebase.database, dispatch);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
