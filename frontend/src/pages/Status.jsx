import Layout from "../components/Layout";
import { CheckCircle, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

export default function Status() {
  const [data, setData] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(`http://localhost:5000/api/service/latest/${user.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result && result.id) {
          setData(result);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setData(null);
      });
  }, []);

  // ================= NO SERVICE =================
  if (!data) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h1 className="text-2xl font-semibold mb-2">
            No Active Service 🚗
          </h1>
          <p className="text-gray-400">
            You haven't booked any service yet.
          </p>
        </div>
      </Layout>
    );
  }

  // ================= STATUS LOGIC =================

  // Normalize backend status (IMPORTANT)
  const normalizedStatus = data.status?.toLowerCase();

  const steps = ["pending", "accepted", "ongoing", "completed"];

  let currentIndex = steps.indexOf(normalizedStatus);

  // 🔥 SAFETY FIX (prevents -1 bug)
  if (currentIndex === -1) currentIndex = 0;

  return (
    <Layout>
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-2">
        Live Service Tracking
      </h1>

      <p className="text-gray-400 mb-6">
        Order #{data.id} • {data.vehicle_name} • {data.vehicle_number}
      </p>

      {/* ================= PROGRESS ================= */}
      <div className="bg-[#1e293b] rounded-xl p-6 mb-8 border border-gray-700">

        <div className="flex justify-between items-center">

          <Step title="Booked" active={currentIndex >= 0} />
          <Step title="Accepted" active={currentIndex >= 1} />
          <Step title="In Service" active={currentIndex >= 2} />
          <Step title="Completed" active={currentIndex >= 3} />

        </div>

        {/* PROGRESS BAR */}
        <div className="h-1 bg-gray-700 mt-4 rounded">
          <div
            className="h-1 bg-green-500 rounded transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / 4) * 100}%`,
            }}
          ></div>
        </div>

      </div>

      {/* ================= DETAILS ================= */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <h2 className="mb-4 font-semibold">Service Details</h2>

        <p className="text-gray-300 mb-2">
          <span className="text-gray-400">Service:</span>{" "}
          {data.service_name || "N/A"}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="text-gray-400">Date:</span>{" "}
          {data.booking_date
            ? new Date(data.booking_date).toLocaleDateString()
            : "N/A"}
        </p>

        <p className="text-gray-300">
          <span className="text-gray-400">Status:</span>{" "}
          <span className="text-orange-400 capitalize">
            {normalizedStatus?.replace("_", " ") || "pending"}
          </span>
        </p>
      </div>
    </Layout>
  );
}

/* ================= STEP COMPONENT ================= */

function Step({ title, active }) {
  return (
    <div className="flex flex-col items-center text-sm">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          active ? "bg-green-500" : "bg-gray-600"
        }`}
      >
        {active ? <CheckCircle size={18} /> : <Wrench size={18} />}
      </div>

      <p className="mt-2 text-gray-300">{title}</p>
    </div>
  );
}