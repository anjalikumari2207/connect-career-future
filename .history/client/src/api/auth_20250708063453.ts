// src/api/auth.ts
import axios from "./axios";

export const login = async (email: string, password: string) => {
  const res = await axios.post("/auth/login", { email, password });

  // ✅ Save token to localStorage
  localStorage.setItem("token", res.data.token);

  return res.data;
};
