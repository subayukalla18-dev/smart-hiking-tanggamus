import axios from "axios";

const client = axios.create({
  baseURL:
    "https://promotes-reporting-eng-generous.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },
});

export default client;