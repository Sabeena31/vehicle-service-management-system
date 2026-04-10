import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ================= SERVICE LIST ================= */

router.get("/list", (req, res) => {
  db.query("SELECT * FROM service_list", (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching services" });
    res.json(result);
  });
});

/* ================= BOOK SERVICE ================= */

router.post("/book", (req, res) => {
  const { vehicle_id, service_id, booking_date } = req.body;

  const insertService = `
    INSERT INTO services (vehicle_id, service_id, booking_date)
    VALUES (?, ?, ?)
  `;

  db.query(insertService, [vehicle_id, service_id, booking_date], (err, result) => {
    if (err) return res.status(500).json({ message: "Error booking service" });

    const serviceId = result.insertId;

    db.query(
      "SELECT price FROM service_list WHERE service_id = ?",
      [service_id],
      (err, priceResult) => {
        if (err) return res.status(500).json({ message: "Error fetching price" });

        const price = priceResult[0].price;

        db.query(
          "INSERT INTO invoices (service_id, total_amount) VALUES (?, ?)",
          [serviceId, price],
          (err) => {
            if (err) return res.status(500).json({ message: "Invoice error" });

            res.json({ message: "Service booked & invoice generated" });
          }
        );
      }
    );
  });
});

/* ================= LATEST SERVICE (FIXED) ================= */

router.get("/latest/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      s.id,
      v.vehicle_number,
      sl.service_name,
      s.booking_date,
      s.status
    FROM services s
    JOIN vehicles v ON s.vehicle_id = v.id
    JOIN service_list sl ON s.service_id = sl.service_id
    WHERE v.user_id = ?
    ORDER BY s.id DESC
    LIMIT 1
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("LATEST ERROR:", err); // 🔥 IMPORTANT
      return res.status(500).json({ message: "Error fetching latest service" });
    }

    res.json(result[0] || null);
  });
});

/* ================= 🔥 INVOICES (MOVE UP) ================= */

router.get("/invoice/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL GetInvoiceDetails(?)", [id], (err, result) => {
    if (err) {
      console.error("PROC ERROR:", err);
      return res.status(500).json({ message: "Error fetching invoice" });
    }

    // ⚠️ IMPORTANT: MySQL returns nested array
    res.json(result[0][0] || null);
  });
});
/* ================= INVOICES ================= */

router.get("/invoices/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM invoice_view WHERE user_id = ? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error" });
      }

      res.json(result);
    }
  );
});

/* ================= PAYMENT ================= */

router.post("/pay", (req, res) => {
  const { invoice_id, payment_method } = req.body;

  db.query(
    "SELECT total_amount, service_id FROM invoices WHERE id = ?",
    [invoice_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error" });

      const amount = result[0].total_amount;
      const serviceId = result[0].service_id;

      db.query(
        "INSERT INTO payments (invoice_id, amount, payment_method) VALUES (?, ?, ?)",
        [invoice_id, amount, payment_method],
        (err) => {
          if (err) return res.status(500).json({ message: "Payment failed" });

          db.query(
            "UPDATE invoices SET payment_status = 'paid' WHERE id = ?",
            [invoice_id]
          );

          db.query(
            "UPDATE services SET status = 'completed' WHERE id = ?",
            [serviceId]
          );

          res.json({ message: "Payment successful" });
        }
      );
    }
  );
});

/* ================= STATUS ================= */

router.get("/status/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      s.*, 
      v.vehicle_number,
      sl.service_name
    FROM services s
    JOIN vehicles v ON s.vehicle_id = v.id
    JOIN service_list sl ON s.service_id = sl.service_id
    WHERE s.id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result[0] || null);
  });
});

/* ================= ADMIN ================= */

router.get("/admin/all", (req, res) => {
  const query = `
    SELECT 
      s.id,
      v.vehicle_number,
      sl.service_name,
      s.booking_date,
      s.status
    FROM services s
    JOIN vehicles v ON s.vehicle_id = v.id
    JOIN service_list sl ON s.service_id = sl.service_id
    ORDER BY s.id DESC
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching data" });

    res.json(result);
  });
});

router.put("/admin/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE services SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Error updating status" });

      // 🔥 INSERT INTO HISTORY WHEN COMPLETED
      if (status === "completed") {
        db.query(
          `
          INSERT INTO service_history (vehicle_id, request_id, service_date, remarks)
          SELECT vehicle_id, id, booking_date, 'Service completed'
          FROM services
          WHERE id = ?
          `,
          [id]
        );
      }

      res.json({ message: "Status updated successfully" });
    }
  );
});

router.delete("/admin/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM services WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting service" });

    res.json({ message: "Deleted successfully" });
  });
});

// assign mechanic
router.put("/admin/assign/:id", (req, res) => {
  const { id } = req.params;
  const { mechanic_id } = req.body;

  db.query(
    "UPDATE services SET mechanic_id = ? WHERE id = ?",
    [mechanic_id, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Assign failed" });

      res.json({ message: "Mechanic assigned" });
    }
  );
});

router.get("/mechanic/:id", (req, res) => {
  const mechanicId = req.params.id;

  const query = `
    SELECT 
      s.id,
      v.vehicle_number,
      sl.service_name,
      s.booking_date,
      s.status
    FROM services s
    JOIN vehicles v ON s.vehicle_id = v.id
    JOIN service_list sl ON s.service_id = sl.service_id
    WHERE s.mechanic_id = ?
    ORDER BY s.id DESC
  `;

  db.query(query, [mechanicId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error" });

    res.json(result);
  });
});

// ADD FEEDBACK
router.post("/feedback", (req, res) => {
  const { user_id, request_id, rating, comments } = req.body;

  const query = `
    INSERT INTO feedback (user_id, request_id, rating, comments)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [user_id, request_id, rating, comments], (err) => {
    if (err) return res.status(500).json({ message: "Error adding feedback" });

    res.json({ message: "Feedback submitted" });
  });
});

/* ================= ⚠️ KEEP THIS LAST ================= */

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      s.id,
      i.id AS invoice_id,   -- 🔥 ADD THIS (MAIN FIX)
      v.vehicle_number,
      sl.service_name,
      sl.price,
      s.booking_date,
      s.status
    FROM services s
    JOIN vehicles v ON s.vehicle_id = v.id
    JOIN service_list sl ON s.service_id = sl.service_id
    LEFT JOIN invoices i ON i.service_id = s.id   -- 🔥 IMPORTANT JOIN
    WHERE v.user_id = ?
    ORDER BY s.id DESC
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching services" });
    }

    res.json(result);
  });
});

export default router;