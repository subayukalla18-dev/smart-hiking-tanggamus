import client from "./client";

export const register = (data) => {
  return client.post("/users", data);
};

export const login = (data) => {
  return client.post("/auth/login", data);
};

export const getProfile = (token) => {
  return client.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};