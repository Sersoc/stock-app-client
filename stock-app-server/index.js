const cors = require("cors");
const express = require("express");
const pool = require("./config/db");


async function createData(title) {
  const [result] = await pool.query('INSERT INTO EXAMPLE (title) VALUES (?)', [title]);
  console.log('Inserted ID:', result.insertId);
}

createData("SOXL");

const stockChartRoutes = require("./routes/stockChartRoutes");
const stockQuotesRoutes = require("./routes/stockQuoteRoutes");
require("dotenv").config();
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

app.use("/api/stock", stockQuotesRoutes);
app.use("/api/chart", stockChartRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
