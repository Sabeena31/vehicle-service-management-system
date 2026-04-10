import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  // 🔥 NEW: mechanic form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= AUTH CHECK =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchUsers();
  }, []);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/users");
      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE MECHANIC =================
  const createMechanic = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          role: "mechanic", // 🔥 IMPORTANT
        }),
      });

      const data = await res.json();
      alert(data.message);

      fetchUsers();

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error creating mechanic");
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await fetch(`http://localhost:5000/api/auth/delete/${id}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-6">Users Management</h1>

      {/* 🔥 ADD MECHANIC */}
      <div className="mb-6 p-4 bg-[#1e293b] rounded-xl border border-gray-700">
        <h2 className="mb-3 font-semibold">Add Mechanic</h2>

        <div className="flex gap-3 flex-wrap">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 bg-[#0f172a] border border-gray-600 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 bg-[#0f172a] border border-gray-600 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 bg-[#0f172a] border border-gray-600 rounded"
          />

          <button
            onClick={createMechanic}
            className="bg-orange-500 px-4 rounded hover:bg-orange-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔥 USERS LIST */}
      {users.length === 0 ? (
        <p className="text-gray-400">No users found</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 bg-[#1e293b] rounded-lg flex justify-between items-center border border-gray-700"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-400">{u.email}</p>
                <p className="text-xs text-gray-500 capitalize">
                  Role: {u.role}
                </p>
              </div>

              <button
                onClick={() => deleteUser(u.id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}