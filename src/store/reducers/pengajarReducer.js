import { ActionTypes } from "../type";

const initialState = {
  pengajar: [],
};

export const pengajarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PENGAJAR:
      return {
        ...state,
        pengajar: payload,
      };

    default:
      return state;
  }
};
