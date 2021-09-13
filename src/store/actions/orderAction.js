import { ActionTypes } from "../type";

export const setOrder = (orders) => {
  return {
    type: ActionTypes.SET_ORDER,
    payload: orders,
  };
};
