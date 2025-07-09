import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Your backend base path
});

// Automatically attach JWT token if logged in
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ BEST PRACTICE format
  }
  return config;
});

export default instance;
