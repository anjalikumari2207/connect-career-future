import axios from "./axios";

interface LoginResponse {
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>("/auth/login", { email, password });

    // ✅ Save token to localStorage
    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Login failed. Please try again.");
  }
};
