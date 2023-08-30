const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "Bdar_db",
  port: "5432",
});

module.exports = pool;