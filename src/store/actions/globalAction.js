import { ActionTypes } from "../type";

export const setModal = (modal) => {
  return {
    type: ActionTypes.SET_MODAL,
    payload: modal,
  };
};

export const setTitle = (title) => {
  return {
    type: ActionTypes.SET_TITLE,
    payload: title,
  };
};
