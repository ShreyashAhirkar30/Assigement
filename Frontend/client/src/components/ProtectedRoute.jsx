import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../auth";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  if (requiredRole) {
    const role = getUserRole();
    if (role !== requiredRole && role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }
  return children;
}
