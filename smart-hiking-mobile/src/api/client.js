import axios from "axios";

const client = axios.create({
  baseURL:
    "https://pvc-mazda-similarly-shannon.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },
});

export default client;