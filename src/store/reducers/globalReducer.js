import { ActionTypes } from "../type";

const initialState = {
  modal: {
    isModal: false,
    message: "",
  },
  title: "",
};

export const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MODAL:
      return {
        ...state,
        modal: payload,
      };
    case ActionTypes.SET_TITLE:
      return {
        ...state,
        title: payload,
      };
    default:
      return state;
  }
};
