import { Link } from "react-router-dom";
import { getUserRole, logout } from "../auth";

export default function Navbar() {
  const role = getUserRole();

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Stores</Link>{" | "}
      {role === "admin" && <Link to="/admin/dashboard">Admin Dashboard</Link>}{" | "}
      {role === "owner" && <Link to="/owner/dashboard">Owner Dashboard</Link>}{" | "}
      <Link to="/profile">Profile</Link>{" | "}
      <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-700 transition" onClick={logout}>Logout</button>
    </nav>
  );
}
