import { ActionTypes } from "../type";

const initialState = {
  modal: {
    isModal: false,
    message: "",
  },
  title: "",
  alert: {
    isOpen: false,
    severity: "",
    message: "",
  },
  session: {
    isLogin: false,
    token: "",
  },
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
    case ActionTypes.SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case ActionTypes.SET_SESSION:
      return {
        ...state,
        session: payload,
      };
    default:
      return state;
  }
};
