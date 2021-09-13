import { ActionTypes } from "../type";

const initialState = {
  produk: [],
};

export const produkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUK:
      return {
        ...state,
        produk: payload,
      };

    default:
      return state;
  }
};
