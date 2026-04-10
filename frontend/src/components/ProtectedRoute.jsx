import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("auth");

  if (!isAuth) {
    return <Navigate to="/" />; // ❌ not logged in → go login
  }

  return children; // ✅ allowed
}