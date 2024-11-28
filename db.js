require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://bookcollectiondatabase_user:22lClzKZahrwKw5CkqgwXkpr7RKtQBKt@dpg-ct4dqpt2ng1s73a4mmt0-a.oregon-postgres.render.com/bookcollectiondatabase", 
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;