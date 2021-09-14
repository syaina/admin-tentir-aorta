import axios from "axios";
import { getToken } from "../auth.service";

const baseURL = "https://api.tentiraorta.com/";

export const postAPI = (endpoint, data) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .post(baseURL + endpoint, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const postWithAuth = (endpoint, data) => {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = new Promise((resolve, reject) => {
    axios
      .post(baseURL + endpoint, data, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const deleteWithAuth = (endpoint, data) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = new Promise((resolve, reject) => {
    axios
      .post(baseURL + endpoint, data, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
