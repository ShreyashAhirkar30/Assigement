import { useState } from "react";
import { api } from "../api";

export default function Profile() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");

  async function changePassword(e) {
    e.preventDefault();
    try {
      await api.post("/auth/change-password", { oldPassword, newPassword });
      alert("Password updated!");
      setOld(""); setNew("");
    } catch (err) {
      alert("Failed: " + (err.response?.data?.error || "Unknown"));
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={changePassword} className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">Change Password</h2>
        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOld(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
