// Set of connections that users will start using as they make requests
require('dotenv').config();
const { Pool } = require("pg");

const pool2 = new Pool({
  user: process.env.MAIN_DB_USER,
  host: process.env.MAIN_DB_HOST,
  password: process.env.MAIN_DB_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  port: process.env.MAIN_DB_PORT,
});


module.exports = pool2;