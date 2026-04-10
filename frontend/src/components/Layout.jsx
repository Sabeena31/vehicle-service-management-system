import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />
        {children}
      </div>
    </div>
  );
}