import axios from "axios";

const client = axios.create({

  baseURL:
    "https://constantly-offerings-transparent-click.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;