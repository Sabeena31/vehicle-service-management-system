import express from "express";
import db from "../config/db.js";

const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  // 🔥 THIS IS THE FIX
  const userRole = role || "user";

  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, email, password, userRole], (err) => {
    if (err) {
      console.error("REGISTER ERROR:", err);
      return res.status(500).json({ message: "Error registering user" });
    }

    res.json({ message: "User created successfully" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error logging in" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: result[0] });
  });
});

/* ================= GET ALL USERS ================= */

router.get("/users", (req, res) => {
  const query = "SELECT id, name, email, role FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.error("USERS ERROR:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }

    res.json(result);
  });
});

/* ================= DELETE USER ================= */

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("DELETE USER ERROR:", err);
      return res.status(500).json({ message: "Error deleting user" });
    }

    res.json({ message: "User deleted successfully" });
  });
});

export default router;