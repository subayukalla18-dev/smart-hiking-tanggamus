import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://duncan-delivered-operators-telephone.trycloudflare.com",
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