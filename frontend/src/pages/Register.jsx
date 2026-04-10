import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",   // ✅ NEW
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    // ✅ BASIC VALIDATION
    if (!form.name || !form.email || !form.password || !form.phone) {
      return alert("Please fill all fields");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering");
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

        <div className="w-full max-w-md space-y-5">

          <h1 className="text-3xl font-semibold">Create Account</h1>
          <p className="text-gray-400 text-sm">
            Enter your details to get started
          </p>

          {/* FULL NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
          />

          {/* PHONE ✅ NEW */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-700 outline-none"
          />

          {/* TERMS */}
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" />
            I agree to Terms & Conditions
          </label>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 py-3 rounded-lg hover:bg-orange-600 font-semibold"
          >
            Create Account →
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-orange-400 cursor-pointer"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}