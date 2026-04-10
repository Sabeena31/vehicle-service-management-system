import Layout from "../components/Layout";
import { useState, useEffect } from "react";

export default function Service() {
  // ================= VEHICLE STATE =================
  const [vehicle, setVehicle] = useState({
    vehicle_number: "",
    brand: "",
    model: "",
    type: "",
    year: "",
    color: "",
  });

  const [vehicles, setVehicles] = useState([]);

  // ================= BOOKING STATE =================
  const [booking, setBooking] = useState({
    vehicle_id: "",
    service_id: "",
    booking_date: "",
  });

  const [services, setServices] = useState([]);

  // ================= HANDLERS =================
  const handleVehicleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD VEHICLE =================
  const handleAddVehicle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!vehicle.vehicle_number || !vehicle.brand) {
      return alert("Please fill required fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/vehicle/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          ...vehicle,
        }),
      });

      const data = await res.json();
      alert(data.message);

      setVehicle({
        vehicle_number: "",
        brand: "",
        model: "",
        type: "",
        year: "",
        color: "",
      });

      fetchVehicles();
    } catch {
      alert("Error adding vehicle");
    }
  };

  // ================= FETCH VEHICLES =================
  const fetchVehicles = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch(
        `http://localhost:5000/api/vehicle/${user.id}`
      );
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH SERVICES =================
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/service/list");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchServices();
  }, []);

  // ================= BOOK SERVICE =================
  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!booking.vehicle_id || !booking.service_id || !booking.booking_date) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/service/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          vehicle_id: booking.vehicle_id,
          service_id: booking.service_id,
          booking_date: booking.booking_date,
        }),
      });

      const data = await res.json();
      alert(data.message);

      setBooking({
        vehicle_id: "",
        service_id: "",
        booking_date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-2">Book a Service</h1>
      <p className="text-gray-400 mb-6">
        Schedule your vehicle maintenance.
      </p>

      <div className="bg-[#0f172a] rounded-2xl p-8 border border-gray-700 mb-10">

        {/* ================= ADD VEHICLE ================= */}
        <h2 className="text-lg font-semibold mb-4">Add Vehicle</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">

          <input
            name="vehicle_number"
            placeholder="Vehicle Number"
            value={vehicle.vehicle_number}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={vehicle.brand}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          />

          <input
            name="model"
            placeholder="Model"
            value={vehicle.model}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          />

          <select
            name="type"
            value={vehicle.type}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          >
            <option value="">Select Type</option>
            <option value="2-wheeler">2-Wheeler</option>
            <option value="4-wheeler">4-Wheeler</option>
          </select>

          <input
            name="year"
            placeholder="Year"
            value={vehicle.year}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          />

          <input
            name="color"
            placeholder="Color"
            value={vehicle.color}
            onChange={handleVehicleChange}
            className="p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddVehicle}
          className="mb-6 px-4 py-2 bg-orange-500 rounded-lg"
        >
          Add Vehicle
        </button>

        {/* ================= BOOK SERVICE ================= */}
        <h2 className="text-lg font-semibold mb-4">Book Service</h2>

        <div className="grid grid-cols-2 gap-6">

          {/* VEHICLE SELECT */}
          <div>
            <label className="text-sm text-gray-400">Vehicle</label>
            <select
              name="vehicle_id"
              value={booking.vehicle_id}
              onChange={handleBookingChange}
              className="w-full mt-2 p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} ({v.vehicle_number})
                </option>
              ))}
            </select>
          </div>

          {/* SERVICE SELECT */}
          <div>
            <label className="text-sm text-gray-400">Service</label>
            <select
              name="service_id"
              value={booking.service_id}
              onChange={handleBookingChange}
              className="w-full mt-2 p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s.service_id} value={s.service_id}>
                  {s.service_name} (₹{s.price})
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-400">Date</label>
            <input
              type="date"
              name="booking_date"
              value={booking.booking_date}
              onChange={handleBookingChange}
              className="w-full mt-2 p-3 bg-[#1e293b] border border-gray-600 rounded-lg"
            />
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleBooking}
            className="px-6 py-2 bg-orange-500 rounded-lg"
          >
            Book Service
          </button>
        </div>

      </div>
    </Layout>
  );
}