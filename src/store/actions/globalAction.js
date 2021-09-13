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

export const setAlert = (alert) => {
  return {
    type: ActionTypes.SET_ALERT,
    payload: alert,
  };
};

export const setSession = (session) => {
  return {
    type: ActionTypes.SET_SESSION,
    payload: session,
  };
};
