import { Bell } from "lucide-react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg text-gray-300">Overview</h2>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-400" />

        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full"
          />

          <div className="text-sm">
            <p>{user?.name || "User"}</p> {/* ✅ dynamic */}
            <p className="text-gray-400 text-xs">Member</p>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="ml-3 text-sm text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}