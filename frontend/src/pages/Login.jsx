import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ SAVE USER
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔥 ROLE BASED REDIRECT (FINAL FIX)
        const role = data.user.role?.toLowerCase();

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "mechanic") {
          navigate("/mechanic");
        } else {
          navigate("/dashboard");
        }

      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">

      {/* LEFT SIDE */}
      <div className="w-1/2 hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-orange-600/20 to-black">

        <div className="text-xl font-bold text-orange-400">
          AutoServe Pro
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            The future of <br /> vehicle management.
          </h1>
          <p className="text-gray-300">
            Precision tracking, expert diagnostics, and seamless scheduling.
          </p>
        </div>

        <div className="flex gap-10 text-orange-400">
          <div>
            <h2 className="text-2xl font-bold">500k+</h2>
            <p className="text-sm text-gray-400">Vehicles Managed</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">99.9%</h2>
            <p className="text-sm text-gray-400">Service Accuracy</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">

          <h1 className="text-3xl font-semibold">Welcome Back</h1>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full mt-1 p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex gap-2 items-center">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-orange-400 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 py-3 rounded-lg hover:bg-orange-600 font-semibold"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>

          {/* DIVIDER */}
          <div className="text-center text-gray-400 text-sm">OR</div>

          {/* REGISTER */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full border border-gray-600 py-3 rounded-lg hover:bg-gray-800"
          >
            Create New Account
          </button>

        </form>
      </div>
    </div>
  );
}