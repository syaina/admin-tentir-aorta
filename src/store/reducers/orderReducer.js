import { ActionTypes } from "../type";

const initialState = {
  order: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER:
      return {
        ...state,
        order: payload,
      };

    default:
      return state;
  }
};
