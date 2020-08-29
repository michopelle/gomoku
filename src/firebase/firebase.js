import React, { createContext } from "react";
import firebaseConfig from "./firebaseConfig";
import app from "firebase/app";
import "firebase/database";
import { useDispatch } from "react-redux";

import { updateData } from "../actions";

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

  if (!app.apps.length) {
    // Set the configuration for your app
    app.initializeApp(firebaseConfig);
    firebase = {
      app: app,
      // Get a reference to the database service
      database: app.database(),

      api: {
        uploadReducers,
        downloadReducers,
      },
    };
  }

  // fromStore
  function uploadReducers({ chests, side, winSide }) {
    // call this function whenever sth has to be updated to Firebase
    // the ref() can be used to input the corresponding node name in Firebase
    firebase.database
      .ref()
      .set({
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
