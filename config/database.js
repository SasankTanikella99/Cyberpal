const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectDB() {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = {
  db: pool,
  connectDB
};