import axios from "axios";

const client = axios.create({

  baseURL:
    "https://bizrate-dictionary-receiving-magic.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;