import { combineReducers } from "redux";

import chestsReducer from "./chestsReducer";
import sideReducer from "./sideReducer";

export default combineReducers({
  chests: chestsReducer,
  side: sideReducer,
});
