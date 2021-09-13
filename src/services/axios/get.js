import axios from "axios";

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
