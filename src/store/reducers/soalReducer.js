import { ActionTypes } from "../type";

const initialState = {
  materi: [],
  bab: [],
  soal: [],
};

export const soalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MATERI:
      return {
        ...state,
        materi: payload,
      };
    case ActionTypes.SET_BAB:
      return {
        ...state,
        bab: payload,
      };
    case ActionTypes.SET_SOAL:
      return {
        ...state,
        soal: payload,
      };

    default:
      return state;
  }
};
