import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ================= PAGES =================
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import Status from "./pages/Status";
import Invoice from "./pages/Invoice";
import Vehicles from "./pages/Vehicles";
import Payment from "./pages/Payment";
import Billing from "./pages/Billing";

// 🔥 ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminUsers from "./pages/AdminUsers";

// 🔥 MECHANIC
import MechanicDashboard from "./pages/MechanicDashboard";

// ================= ROUTES =================
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service"
          element={
            <ProtectedRoute role="user">
              <Service />
            </ProtectedRoute>
          }
        />

        <Route
          path="/status"
          element={
            <ProtectedRoute role="user">
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/status/:id"
          element={
            <ProtectedRoute role="user">
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute role="user">
              <Invoice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute role="user">
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute role="user">
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* ================= MECHANIC ================= */}
        <Route
          path="/mechanic"
          element={
            <ProtectedRoute role="mechanic">
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}