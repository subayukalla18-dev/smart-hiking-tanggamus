import axios from "axios";

const client = axios.create({
  baseURL:
    "https://literacy-within-abilities-scores.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },
});

export default client;