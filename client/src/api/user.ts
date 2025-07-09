// src/api/user.ts
import axios from "./axios";

export const fetchCurrentUser = async () => {
  const res = await axios.get("/users/me"); // You must create this route if not present
  return res.data;
};
