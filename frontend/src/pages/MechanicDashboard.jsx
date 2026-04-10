import MechanicLayout from "../components/MechanicLayout";
import { useEffect, useState } from "react";

export default function MechanicDashboard() {
  const [services, setServices] = useState([]);

  const mechanic = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/service/mechanic/${mechanic.id}`
      );

      const data = await res.json();

      if (Array.isArray(data)) setServices(data);
      else setServices([]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/service/admin/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  return (
    <MechanicLayout>
      <h1 className="text-2xl mb-6">My Assigned Services</h1>

      {services.length === 0 ? (
        <p className="text-gray-400">No assigned work</p>
      ) : (
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="p-4 bg-[#1e293b] rounded-xl">

              <p><b>Vehicle:</b> {s.vehicle_number}</p>
              <p><b>Service:</b> {s.service_name}</p>
              <p><b>Status:</b> {s.status}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(s.id, "Ongoing")}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Start
                </button>

                <button
                  onClick={() => updateStatus(s.id, "Completed")}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  Complete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </MechanicLayout>
  );
}