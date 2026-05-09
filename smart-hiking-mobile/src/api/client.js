import axios from "axios";

const client = axios.create({

  baseURL:
    "https://manhunt-arrange-repair.ngrok-free.dev",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;