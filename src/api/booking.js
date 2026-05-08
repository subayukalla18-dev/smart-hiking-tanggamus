import client from "./client";

export const createBooking = (
  data,
  token
) => {

  return client.post(
    "/booking",
    data,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};

export const getMyBookings = (
  token
) => {

  return client.get(
    "/booking/me",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};