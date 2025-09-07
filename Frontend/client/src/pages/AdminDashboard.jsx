import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {
  const [totals, setTotals] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const t = await api.get("/admin/dashboard");
      setTotals(t.data);
      const u = await api.get("/admin/users");
      setUsers(u.data);
      const s = await api.get("/admin/stores");
      setStores(s.data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-purple-800 mb-8 text-center drop-shadow-lg tracking-wide">
          <span className="inline-block align-middle mr-2">🛡️</span>Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white border-2 border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <span className="text-4xl mb-2">👤</span>
            <span className="text-3xl font-bold text-blue-600">{totals.users_count ?? 0}</span>
            <span className="text-gray-500 mt-2">Users</span>
          </div>
          <div className="bg-white border-2 border-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <span className="text-4xl mb-2">🏬</span>
            <span className="text-3xl font-bold text-green-600">{totals.stores_count ?? 0}</span>
            <span className="text-gray-500 mt-2">Stores</span>
          </div>
          <div className="bg-white border-2 border-yellow-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <span className="text-4xl mb-2">⭐</span>
            <span className="text-3xl font-bold text-yellow-600">{totals.ratings_count ?? 0}</span>
            <span className="text-gray-500 mt-2">Ratings</span>
          </div>
        </div>

        <div className="border-b-2 border-purple-200 mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-blue-100 rounded-xl shadow p-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
              <span>👤</span>Users
            </h3>
            <ul className="space-y-3">
              {users.length === 0 ? (
                <li className="text-gray-400">No users found.</li>
              ) : (
                users.map(u => (
                  <li key={u.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-50 transition">
                    <span className="font-medium text-gray-700 flex items-center gap-2">
                      <span>👤</span>{u.name}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold border border-purple-200">
                      {u.role}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="bg-white border border-green-100 rounded-xl shadow p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
              <span>🏬</span>Stores
            </h3>
            <ul className="space-y-3">
              {stores.length === 0 ? (
                <li className="text-gray-400">No stores found.</li>
              ) : (
                stores.map(s => (
                  <li key={s.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-green-50 transition">
                    <span className="font-medium text-gray-700 flex items-center gap-2">
                      <span>🏬</span>{s.name}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200">
                      {s.average_rating}⭐
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
