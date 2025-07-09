import axios from "./axios";

export const updateProfile = async (data: any) => {
  const res = await axios.put("/profile", data);
  return res.data;
};

export const fetchProfile = async () => {
  const res = await axios.get("/profile");
  return res.data;
};
