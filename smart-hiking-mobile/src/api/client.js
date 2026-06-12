import axios from "axios";

const client = axios.create({

  baseURL:
    "https://waves-rob-necklace-joseph.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;