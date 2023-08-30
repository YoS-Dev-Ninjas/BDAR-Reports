// Set of connections that users will start using as they make requests
require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.REPLICA_DB_USER,
  host: process.env.REPLICA_DB_HOST,
  password: process.env.REPLICA_DB_PASSWORD,
  database: process.env.REPLICA_DB_NAME,
  port: process.env.REPLICA_DB_PORT,
});


module.exports = pool;