import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔐 ADMIN PROTECTION
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchData();
    fetchMechanics();
  }, []);

  // ================= FETCH SERVICES =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/service/admin/all"
      );
      const data = await res.json();

      if (Array.isArray(data)) setServices(data);
      else setServices([]);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // ================= FETCH MECHANICS =================
  const fetchMechanics = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/users"
      );

      const data = await res.json();

      // filter only mechanics
      const mech = data.filter((u) => u.role === "mechanic");
      setMechanics(mech);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:5000/api/service/admin/status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    fetchData();
  };

  // ================= ASSIGN MECHANIC =================
  const assignMechanic = async (id, mechanicId) => {
    await fetch(
      `http://localhost:5000/api/service/admin/assign/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mechanic_id: mechanicId }),
      }
    );

    fetchData();
  };

  // ================= DELETE =================
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await fetch(
      `http://localhost:5000/api/service/admin/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchData();
  };

  // ================= LOADING =================
  if (loading) {
    return <AdminLayout>Loading...</AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-6">Service Requests</h1>

      <div className="bg-[#0f172a] rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">

          {/* HEAD */}
          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Assign</th>
              <th>Update</th>
              <th className="text-right px-4">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-300">
            {services.map((s) => (
              <tr
                key={s.id}
                className="border-b border-gray-700 hover:bg-[#1e293b]"
              >

                {/* VEHICLE */}
                <td className="px-4 py-4">
                  {s.vehicle_number}
                </td>

                {/* SERVICE */}
                <td>{s.service_name}</td>

                {/* DATE */}
                <td>
                  {new Date(s.booking_date).toLocaleDateString()}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.status?.toLowerCase() === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : s.status?.toLowerCase() === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                {/* 🔥 ASSIGN MECHANIC */}
                <td>
                  <select
                    onChange={(e) =>
                      assignMechanic(s.id, e.target.value)
                    }
                    className="bg-[#1e293b] border border-gray-600 px-2 py-1 text-xs rounded"
                  >
                    <option value="">Assign</option>
                    {mechanics.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* 🔥 STATUS BUTTONS */}
                <td className="flex gap-2">
                  <button
                    onClick={() => updateStatus(s.id, "accepted")}
                    className="px-2 py-1 bg-blue-500 rounded text-xs"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(s.id, "ongoing")}
                    className="px-2 py-1 bg-yellow-500 rounded text-xs"
                  >
                    Ongoing
                  </button>

                  <button
                    onClick={() => updateStatus(s.id, "completed")}
                    className="px-2 py-1 bg-green-500 rounded text-xs"
                  >
                    Complete
                  </button>
                </td>

                {/* DELETE */}
                <td className="text-right px-4">
                  <button
                    onClick={() => deleteService(s.id)}
                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* EMPTY */}
        {services.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No service requests found
          </div>
        )}
      </div>
    </AdminLayout>
  );
}