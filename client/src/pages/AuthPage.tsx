import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { useSearchParams } from "react-router-dom";

type Props = {
  onLogin: (user: any) => void;
};

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    // add other user fields if needed
  };
}

export default function AuthPage({ onLogin }: Props) {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "login" or null

  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(mode === "login"); // auto-switch form based on URL
  }, [mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await axios.post<AuthResponse>(endpoint, form);

      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
