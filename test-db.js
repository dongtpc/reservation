const pool = require('./db');

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Database connected:");
    console.log(res.rows);
  } catch (err) {
    console.error("Error connecting:", err);
  } finally {
    pool.end();
  }
}

test();