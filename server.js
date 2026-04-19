const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ Database connected");
  }
});

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Church backend is running");
});

/* ================= SERMONS ================= */
app.get("/sermons", (req, res) => {
  db.query("SELECT * FROM sermons", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/sermons", (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO sermons (title, content) VALUES (?, ?)",
    [title, content],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Sermon saved" });
    }
  );
});

/* ================= PRAYERS ================= */
app.get("/prayers", (req, res) => {
  db.query("SELECT * FROM prayers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/prayers", (req, res) => {
  const { message } = req.body;

  console.log("🔥 PRAYER RECEIVED:", message);

  db.query(
    "INSERT INTO prayers (message) VALUES (?)",
    [message],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Prayer saved" });
    }
  );
});

/* ================= MEMBERS ================= */
app.get("/members", (req, res) => {
  db.query("SELECT * FROM members", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/members", (req, res) => {
  const { name, phone } = req.body;

  db.query(
    "INSERT INTO members (name, phone) VALUES (?, ?)",
    [name, phone],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Member saved" });
    }
  );
});

/* ================= DONATIONS ================= */
app.get("/donations", (req, res) => {
  db.query("SELECT * FROM donations", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/donations", (req, res) => {
  const { phone, amount } = req.body;

  db.query(
    "INSERT INTO donations (phone, amount, status) VALUES (?, ?, 'pending')",
    [phone, amount],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Donation saved" });
    }
  );
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
