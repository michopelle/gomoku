import React, { createContext } from "react";
import { ReactReduxContext } from "react-redux";
import firebaseConfig from "./firebaseConfig";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";

import {
  gameInit,
  setRoomInfo,
  setRoomError,
  updateData,
} from "../store/actions/";

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children, store }) => {
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
        setUnmatchNode,
        visitorJoinListener,
        removeUnmatchNode,
        visitorJoinViaRoomId,
        startGame,
        activateVisitorBoard,
        removeMatchedNode,
      },

      auth: auth,

      user: user,
    };
  }

  // fromStore
  function uploadReducers({ roomInfo, chests, side, winSide }) {
    console.log("from upload reducer", roomInfo, chests, winSide);
    // call this function whenever sth has to be updated to Firebase
    // the ref() can be used to input the corresponding node name in Firebase
    firebase.database
      .ref("/matchedGame/" + roomInfo.key)
      .update({
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
  function downloadReducers({ key }) {
    // This method is triggered once when the listener is attached
    // and again every time the data, including children, changes.
    if (key) {
      firebase.database.ref("/matchedGame/" + key).on("value", (snapshot) => {
        if (snapshot.val()) {
          console.log("reducers downloaded from db");
          const { chests, side, winSide } = snapshot.val();
          dispatch(updateData(chests, side, winSide));
        }
      });
    }
  }
  // downloadReducers();

  function setUnmatchNode({ displayName }) {
    // Get a key for a new player input display name.
    var newUnmatchKey = firebase.database.ref("/unmatch/").push().key;

    firebase.database
      .ref("/unmatch/" + newUnmatchKey)
      .update({
        displayName: displayName,
        roomId: newUnmatchKey.substr(
          newUnmatchKey.length - 6,
          newUnmatchKey.length - 1
        ),
        joinable: true,
      })
      .then(() => {
        visitorJoinListener({ key: newUnmatchKey });

        // change redux for hosting new room
        dispatch(
          setRoomInfo({
            roomId: newUnmatchKey.substr(
              newUnmatchKey.length - 6,
              newUnmatchKey.length - 1
            ),
            key: newUnmatchKey,
            host: true,
            opponentDisplayName: null,
            isGameStarted: false,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function visitorJoinListener({ key }) {
    firebase.database.ref("/unmatch/" + key).on("value", (snapshot) => {
      if (snapshot.val()) {
        const { roomId, visitorDisplayName } = snapshot.val();
        dispatch(
          setRoomInfo({
            roomId: roomId,
            key: key,
            host: true,
            opponentDisplayName: visitorDisplayName,
            isGameStarted: false,
          })
        );
      }
    });
  }

  function removeUnmatchNode({ key }) {
    firebase.database
      .ref("/unmatch/" + key)
      .remove()
      .then(() => console.log("successfully deleted node"))
      .catch((_) => dispatch(setRoomError({ error: "Cannot delete node" })));
  }

  function visitorJoinViaRoomId({ roomId, visitorDisplayName }) {
    firebase.database
      .ref("/unmatch")
      .orderByKey()
      .once("value")
      .then((snapshot) => {
        // search through all child for matched roomId
        snapshot.forEach((childSnapShot) => {
          var key = childSnapShot.key;
          if (key.substr(key.length - 6, key.length - 1) === roomId) {
            if (childSnapShot.child("joinable").val() === true) {
              console.log("childSnapShot", childSnapShot.val());

              // switch joinable to false after a player is joined
              // change state to render joined room
              childSnapShot.ref
                .update({
                  joinable: false,
                  visitorDisplayName: visitorDisplayName,
                })
                .then(() => {
                  console.log("key is changed", childSnapShot.key);
                  activateVisitorBoard({ key: childSnapShot.key });
                  dispatch(
                    setRoomInfo({
                      roomId: childSnapShot.child("roomId").val(),
                      key: childSnapShot.key,
                      host: false,
                      opponentDisplayName: childSnapShot
                        .child("displayName")
                        .val(),
                      isGameStarted: false,
                    })
                  );
                  return;
                })
                .catch((_) => {
                  dispatch(
                    setRoomError({
                      error: "There is some error in joining the room",
                    })
                  );
                  return;
                });
            } else {
              dispatch(setRoomError({ error: "The room is not joinable" }));
              return;
            }
          }
        });
      });
  }

  function startGame({
    roomId,
    key,
    displayName,
    opponentDisplayName,
    chests,
    side,
    winSide,
  }) {
    const createMatchedGame = () => {
      firebase.database.ref("/matchedGame").update({
        [key]: {
          roomId: roomId,
          player1: displayName,
          player2: opponentDisplayName,
          playerLeft: false,
          chests: chests,
          side: side,
          winSide: winSide,
        },
      });
    };
    firebase.database
      .ref("/unmatch/" + key)
      .remove()
      .then(() => {
        createMatchedGame();
      })
      .catch((_) => dispatch(setRoomError({ error: "Cannot delete node" })));
  }

  function activateVisitorBoard({ key }) {
    console.log("activateVisitorBoard is called", key);
    firebase.database.ref("/matchedGame/" + key).once("value", (snapshot) => {
      if (snapshot.val()) {
        console.log("from visitorlistener snapshot.val", snapshot.val());
        dispatch(gameInit());
        downloadReducers({ key });
      }
    });
  }

  // remove matched game after both player left the tab
  function removeMatchedNode({ key }) {
    firebase.database
      .ref("/matchedGame/" + key + "/playerLeft")
      .once("value", (snapshot) => {
        if (snapshot.val() === true) {
          // delete node if another player has left
          firebase.database
            .ref("/matchedGame/" + key)
            .remove()
            .then(() => console.log("successfully deleted node"))
            .catch((_) =>
              dispatch(setRoomError({ error: "Cannot delete node" }))
            );
        } else {
          // turn indicator true when the first player left
          firebase.database
            .ref("/matchedGame/" + key)
            .update({ playerLeft: true });
        }
      });
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
