import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { soalReducer } from "./soalReducer";
import { pengajarReducer } from "./pengajarReducer";
import { produkReducer } from "./produkReducer";
import { customerReducer } from "./customerReducer";
import { orderReducer } from "./orderReducer";

const reducers = combineReducers({
  fiturSoal: soalReducer,
  main: globalReducer,
  pengajar: pengajarReducer,
  produk: produkReducer,
  customer: customerReducer,
  order: orderReducer,
});

export default reducers;
