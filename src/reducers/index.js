import { combineReducers } from "redux";

import authUserReducer from "./authUserReducer";
import chestsReducer from "./chestsReducer";
// import moveReducer from "./moveReducer";
import sideReducer from "./sideReducer";
import winSideReducer from "./winSideReducer";

export default combineReducers({
  authUser: authUserReducer,
  chests: chestsReducer,
  side: sideReducer,
  winSide: winSideReducer,
});
