import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Vehicles() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch(
        `http://localhost:5000/api/service/${user.id}`
      );

      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Service History</h1>

      <div className="bg-[#0f172a] rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right px-4">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-300">
            {services.map((s) => (
              <Row
                key={s.id}
                invoice_id={s.invoice_id}  // 🔥 IMPORTANT
                vehicle={`${s.vehicle_name} (${s.vehicle_number})`}
                service={s.service_name}
                date={new Date(s.booking_date).toLocaleDateString()}
                status={s.status}
              />
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {services.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No service history found
          </div>
        )}
      </div>
    </Layout>
  );
}

/* ================= ROW ================= */

function Row({ invoice_id, vehicle, service, date, status }) {
  const navigate = useNavigate();

  const getStatusStyle = () => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "accepted":
        return "bg-blue-500/20 text-blue-400";
      case "in_progress":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-[#1e293b]">

      <td className="px-4 py-4 font-medium">{vehicle}</td>

      <td>{service}</td>

      <td className="text-center">{date}</td>

      <td>
        <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle()}`}>
          {status.replace("_", " ")}
        </span>
      </td>

      <td className="text-right px-4">
        {invoice_id ? (
          <button
            onClick={() => navigate(`/invoice/${invoice_id}`)}
            className="px-3 py-1 border border-orange-500 text-orange-400 rounded hover:bg-orange-500/10"
          >
            View Invoice
          </button>
        ) : (
          <span className="text-gray-500 text-sm">No Invoice</span>
        )}
      </td>

    </tr>
  );
}