import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Users,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Service Requests", path: "/admin/services", icon: <Wrench size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] p-6 flex flex-col justify-between border-r border-gray-800">
      
      <div>
        <h1 className="text-xl font-bold mb-10 text-orange-500">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <p className="text-gray-500 text-sm">Admin Controls</p>
    </div>
  );
}