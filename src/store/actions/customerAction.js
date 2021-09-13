import { ActionTypes } from "../type";

export const setCustomer = (customers) => {
  return {
    type: ActionTypes.SET_CUSTOMER,
    payload: customers,
  };
};
