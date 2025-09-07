import { useEffect, useState } from "react";
import { api } from "../api";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  async function fetchStores() {
    const res = await api.get("/stores", { params: { name: search } });
    setStores(shuffle(res.data));
  }

  useEffect(() => { fetchStores(); }, [search]);

  async function rateStore(id, rating) {
    try {
      await api.post(`/stores/${id}/ratings`, { rating });
      fetchStores();
    } catch (err) {
      alert("Login to rate");
    }
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-3xl w-full mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-lg tracking-wide">
          <span className="inline-block align-middle mr-2">🏬</span>Stores
        </h2>
        <div className="flex gap-4 mb-8 justify-center">
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchStores}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        <ul className="space-y-6">
          {stores.length === 0 ? (
            <li className="text-gray-400 text-center">No stores found.</li>
          ) : (
            stores.map((s) => (
              <li key={s.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <span className="font-bold text-lg text-blue-700 flex items-center gap-2">
                    <span>🏪</span>{s.name}
                  </span>
                  <span className="text-sm text-gray-500">{s.address}</span>
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold border border-yellow-200">Avg: {s.average_rating} ⭐</span>
                  {s.user_rating && <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold border border-purple-200">Your rating: {s.user_rating}</span>}
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      onClick={() => rateStore(s.id, n)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                    >
                      {n}⭐
                    </button>
                  ))}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
