import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { soalReducer } from "./soalReducer";

const reducers = combineReducers({
  fiturSoal: soalReducer,
  main: globalReducer,
});

export default reducers;
