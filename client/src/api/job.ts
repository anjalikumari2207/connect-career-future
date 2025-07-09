// src/api/job.ts
import axios from "./axios";

// ✅ Define Job interface
export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  createdAt: string;
  createdBy: {
    name: string;
  };
  aiMatch?: number;
}

// ✅ Return Promise<Job[]>
export const fetchJobs = async (): Promise<Job[]> => {
  const res = await axios.get<Job[]>("/jobs");
  return res.data;
};
