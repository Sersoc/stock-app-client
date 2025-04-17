
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
const stockChartRoutes = require("./routes/stockChartRoutes");
const stockQuotesRoutes = require("./routes/stockQuoteRoutes");
require("dotenv").config();


const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydb',
  password: 'mypass',
  port: 5432,
});

async function initDB() {
  const result = await pool.query('SELECT NOW()');
  console.log("DB 연결 성공:", result.rows);
}
initDB();

const app = express();
app.use(
  cors({
    exposedHeaders: [
      "x-ratelimit-limit",
      "x-ratelimit-remaining",
      "x-ratelimit-reset",
    ],
  })
);
const port = 3002;

app.use("/api/stock", stockQuotesRoutes );
app.use("/api/chart", stockChartRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
