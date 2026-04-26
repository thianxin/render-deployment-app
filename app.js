const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  const message = process.env.APP_MESSAGE || "Hello from my Render Deployment App!";
  res.send(message + " Database app is running.");
});

app.get("/setup", async (req, res) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  res.send("Database table created successfully.");
});

app.get("/add", async (req, res) => {
  await pool.query(
    "INSERT INTO messages (text) VALUES ($1)",
    ["Hello from Render PostgreSQL database"]
  );
  res.send("Data inserted successfully.");
});

app.get("/data", async (req, res) => {
  const result = await pool.query("SELECT * FROM messages ORDER BY id ASC");
  res.json(result.rows);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
