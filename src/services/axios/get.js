import axios from "axios";
import { getToken } from "../auth.service";

const baseURL = "https://api.tentiraorta.com/";

export const getAPI = (endpoint) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(baseURL + endpoint)
      .then((response) => {
        //   console.log(response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const getWithAuth = (endpoint) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = new Promise((resolve, reject) => {
    axios
      .get(baseURL + endpoint, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
