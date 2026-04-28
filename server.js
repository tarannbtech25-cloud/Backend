const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route (important for testing)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// ❗ TEMP: DB connection (will fail on Render, OK for now)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// ✅ API route
app.get("/services", (req, res) => {
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
