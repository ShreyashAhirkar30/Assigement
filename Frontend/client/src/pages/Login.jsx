import { useState } from "react";
import { api } from "../api";
import { setToken, getUserRole } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      const role = getUserRole();
      if (role === "admin") window.location = "/admin/dashboard";
      else if (role === "owner") window.location = "/owner/dashboard";
      else window.location = "/";
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 z-50">
      <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">Login</h2>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
