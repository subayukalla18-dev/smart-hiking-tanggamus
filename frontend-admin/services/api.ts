import axios from "axios";

export const api = axios.create({
  baseURL:
    "http://192.168.1.14:3001",
});

// AUTO TOKEN
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

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