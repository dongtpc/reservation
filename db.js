const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reservation_db',
  password: 'World!23',
  port: 5432,
});

module.exports = pool;