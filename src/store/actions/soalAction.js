import { ActionTypes } from "../type";

export const setMateri = (materies) => {
  return {
    type: ActionTypes.SET_MATERI,
    payload: materies,
  };
};

export const setBab = (babs) => {
  return {
    type: ActionTypes.SET_BAB,
    payload: babs,
  };
};

export const setSoal = (soals) => {
  return {
    type: ActionTypes.SET_SOAL,
    payload: soals,
  };
};
