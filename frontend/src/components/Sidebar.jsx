import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  CreditCard,
  History,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Book Service", path: "/service", icon: <Calendar size={18} /> },
    { name: "Service Status", path: "/status", icon: <Wrench size={18} /> },
    { name: "Billing", path: "/billing", icon: <CreditCard size={18} /> }, // ✅ FIXED
    { name: "History", path: "/history", icon: <History size={18} /> },
  ];

  // 🔥 ACTIVE MATCH (important for dynamic routes)
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] p-6 flex flex-col justify-between border-r border-gray-800">
      
      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-10 text-orange-500">
          AutoServe Pro
        </h1>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="text-gray-500 text-sm space-y-2">
        <p className="cursor-pointer hover:text-white">Settings</p>
        <p className="cursor-pointer hover:text-white">Support</p>
      </div>
    </div>
  );
}