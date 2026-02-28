const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reservation_db',
  password: 'YOUR_POSTGRES_PASSWORD',
  port: 5432,
});

module.exports = pool;