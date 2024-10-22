const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgrespostgres",
  host: "localhost",
  port: 5432,
  database: "budgettracker",
});

module.exports = pool;
