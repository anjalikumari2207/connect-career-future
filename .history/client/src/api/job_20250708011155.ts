import axios from "./axios";

export const fetchJobs = async () => {
  const res = await axios.get("/jobs");
  return res.data;
};
