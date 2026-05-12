import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://dish-weed-beds-airports.trycloudflare.com",
});

// AUTO TOKEN
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);