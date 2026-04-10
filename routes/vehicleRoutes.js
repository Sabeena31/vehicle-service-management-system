import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADD VEHICLE
router.post("/add", (req, res) => {
  const {
    user_id,
    vehicle_number,
    brand,
    model,
    type,
    year,
    color,
  } = req.body;

  const query = `
    INSERT INTO vehicles 
    (user_id, vehicle_number, brand, model, type, year, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, vehicle_number, brand, model, type, year, color],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding vehicle" });
      }

      res.json({ message: "Vehicle added successfully" });
    }
  );
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const query = "SELECT * FROM vehicles WHERE user_id = ?";

  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching vehicles" });
    }

    res.json(result);
  });
});

export default router;