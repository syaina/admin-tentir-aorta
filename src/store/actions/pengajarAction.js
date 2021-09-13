import { ActionTypes } from "../type";

export const setPengajar = (pengajar) => {
  return {
    type: ActionTypes.SET_PENGAJAR,
    payload: pengajar,
  };
};
