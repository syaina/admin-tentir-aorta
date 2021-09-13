import { ActionTypes } from "../type";

export const setProduk = (produk) => {
  return {
    type: ActionTypes.SET_PRODUK,
    payload: produk,
  };
};
