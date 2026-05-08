import api from "./client";

export const getTracking = async () => {
  return api.get("/tracking");
};