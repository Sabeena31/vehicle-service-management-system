import express from "express";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ fixed
import vehicleRoutes from "./routes/vehicleRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/service", serviceRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend API Running 🚀");
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});