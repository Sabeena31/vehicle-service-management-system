import Layout from "../components/Layout";
import { Car, Calendar, Wrench, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH USER SERVICES
  const fetchServices = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/service/${user.id}`
      );
      const data = await res.json();
      setServices(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Layout>

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-900/80 to-gray-800/80 backdrop-blur-md p-8 rounded-2xl mb-10 flex justify-between items-center shadow-xl border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-300 mb-4">
            {services.length > 0
              ? `You have ${services.length} service request(s).`
              : "No active services yet. Book your first service now!"}
          </p>

          <button
            onClick={() => navigate("/service")}
            className="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 shadow-md"
          >
            Book Service →
          </button>
        </div>

        <Car size={80} className="text-gray-500 opacity-70" />
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

        <ActionCard
          icon={<Calendar />}
          title="Book Service"
          onClick={() => navigate("/service")}
        />

        <ActionCard
          icon={<Wrench />}
          title="Service Status"
          onClick={() => navigate("/status")}
        />

        <ActionCard
          icon={<FileText />}
          title="Service History"
          onClick={() => navigate("/history")}
        />

        <ActionCard
          icon={<Car />}
          title="Billing & Payments"
          onClick={() => navigate("/billing")}
        />

      </div>

      {/* RECENT ACTIVITY */}
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      <div className="bg-[#1e293b] rounded-xl p-6 space-y-4 shadow-lg border border-gray-700">

        {services.length === 0 ? (
          <p className="text-gray-400 text-center">
            No recent activity
          </p>
        ) : (
          services.slice(0, 5).map((s) => (
            <Activity
              key={s.id}
              title={`${s.service_name} - ${s.status}`}
              time={new Date(s.booking_date).toLocaleDateString()}
            />
          ))
        )}

      </div>

    </Layout>
  );
}

/* ---------- COMPONENTS ---------- */

function ActionCard({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1e293b] p-5 rounded-xl transition duration-300 cursor-pointer 
      hover:scale-105 hover:bg-[#273449] hover:shadow-lg hover:shadow-orange-500/10"
    >
      <div className="text-orange-400 mb-3">{icon}</div>
      <h3 className="text-sm font-medium">{title}</h3>
    </div>
  );
}

function Activity({ title, time }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-none">
      <p className="text-gray-300">{title}</p>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>
  );
}