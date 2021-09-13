import { ActionTypes } from "../type";

const initialState = {
  customer: {
    data: [],
    current_page: "",
    next_page_url: "",
    prev_page_url: "",
    first_page_url: "",
    last_page_url: "",
  },
};

export const customerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMER:
      return {
        ...state,
        customer: payload,
      };

    default:
      return state;
  }
};
