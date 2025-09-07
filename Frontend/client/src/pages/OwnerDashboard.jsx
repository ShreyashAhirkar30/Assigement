import { useEffect, useState } from "react";
import { api } from "../api";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/owner/dashboard");
      setStores(res.data.stores);
    }
    load();
  }, []);

  return (
  <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full mx-auto">
        <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center drop-shadow-lg tracking-wide">
          <span className="inline-block align-middle mr-2">🏬</span>Owner Dashboard
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Your Stores</h3>
          <ul className="space-y-4">
            {stores.length === 0 ? (
              <li className="text-gray-400">No stores found.</li>
            ) : (
              stores.map((s) => (
                <li key={s.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 rounded-lg border border-blue-100 hover:bg-blue-50 transition">
                  <span className="font-semibold text-gray-700 text-lg flex items-center gap-2">
                    <span>🏪</span>{s.name}
                  </span>
                  <span className="mt-2 md:mt-0 text-sm text-gray-500 flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold border border-yellow-200">{s.average_rating}⭐</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-200">{s.ratings_count} ratings</span>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
