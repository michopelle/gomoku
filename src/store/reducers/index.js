import { combineReducers } from "redux";

import authUserReducer from "./authUserReducer";
import chestsReducer from "./chestsReducer";
import displayNameReducer from "./displayNameReducer";
// import moveReducer from "./moveReducer";
import roomErrorReducer from "./roomErrorReducer";
import roomInfoReducer from "./roomInfoReducer";
import sideReducer from "./sideReducer";
import winSideReducer from "./winSideReducer";

export default combineReducers({
  authUser: authUserReducer,
  chests: chestsReducer,
  displayName: displayNameReducer,
  roomError: roomErrorReducer,
  roomInfo: roomInfoReducer,
  side: sideReducer,
  winSide: winSideReducer,
});
