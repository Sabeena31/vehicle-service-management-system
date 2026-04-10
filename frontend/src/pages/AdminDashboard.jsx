import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔐 ADMIN PROTECTION
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/service/admin/all");
      const data = await res.json();

      const total = data.length;

      const pending = data.filter(
        (s) => s.status?.toLowerCase() === "pending"
      ).length;

      const completed = data.filter(
        (s) => s.status?.toLowerCase() === "completed"
      ).length;

      setStats({ total, pending, completed });
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <Card title="Total Services" value={stats.total} />
          <Card title="Pending" value={stats.pending} />
          <Card title="Completed" value={stats.completed} />
        </div>
      )}
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}