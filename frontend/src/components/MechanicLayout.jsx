import { Link, useLocation } from "react-router-dom";

export default function MechanicLayout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] p-6 border-r border-gray-800">

        <h1 className="text-xl font-bold mb-10 text-orange-500">
          Mechanic Panel
        </h1>

        <nav className="flex flex-col gap-2">
          <Link
            to="/mechanic"
            className={`px-4 py-3 rounded-lg ${
              location.pathname === "/mechanic"
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Assigned Services
          </Link>
        </nav>

        <p className="text-gray-500 text-sm mt-10">
          Mechanic Controls
        </p>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="text-red-400"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}