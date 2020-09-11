import { combineReducers } from "redux";

import chestsReducer from "./chestsReducer";
// import moveReducer from "./moveReducer";
import sideReducer from "./sideReducer";
import winSideReducer from "./winSideReducer";
import authUserReducer from "./authUserReducer";

export default combineReducers({
  authUser: authUserReducer,
  chests: chestsReducer,
  side: sideReducer,
  winSide: winSideReducer,
});
