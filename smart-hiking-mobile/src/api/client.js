import axios from "axios";

const client = axios.create({

  baseURL:
    "https://formats-walter-edwards-classical.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;