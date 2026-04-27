const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root",   // ⚠️ change this
  database: "DBMSBACKEND"    // ⚠️ change this
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// 📦 API to get data
app.get("/services", (req, res) => {
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});