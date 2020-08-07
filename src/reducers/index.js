import { combineReducers } from "redux";

import chestsReducer from "./chestsReducer";
import sideReducer from "./sideReducer";
import winSideReducer from "./winSideReducer";

export default combineReducers({
  chests: chestsReducer,
  side: sideReducer,
  winSide: winSideReducer,
});
