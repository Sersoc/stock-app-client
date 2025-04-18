const cors = require("cors");
const express = require("express");
const port = 3002;

const stockChartRoutes = require("./routes/stockChartRoutes");
const stockQuotesRoutes = require("./routes/stockQuoteRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
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

app.use("/api/db", favoritesRoutes);
app.use("/api/stock", stockQuotesRoutes);
app.use("/api/chart", stockChartRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
