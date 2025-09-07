import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully, please login");
      window.location = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Register failed");
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">Register</h2>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          autoComplete="email"
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
