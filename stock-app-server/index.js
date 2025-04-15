
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const yahooFinance = require("yahoo-finance2").default;

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
const API_KEY = process.env.FINNHUB_API_KEY;
const CHART_API_KEY = process.env.TWELVEDATA_API_KEY;

// 종목 정보 (예: AAPL)
app.get("/api/stock/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: API_KEY,
      },
    });

    // Finnhub의 헤더를 클라이언트에게 전달
    const headerKeys = [
      "x-ratelimit-limit",
      "x-ratelimit-remaining",
      "x-ratelimit-reset",
    ];
    headerKeys.forEach((key) => {
      const value = response.headers[key];
      if (value !== undefined) {
        res.setHeader(key, value);
      }
    });

    res.json(response.data);
    
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).send("Error fetching stock data");
  }
});
// 서버에 candle endpoint 추가
app.get("/api/chart/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const result = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1주일 전
      period2: new Date(), // 지금
      interval: "1d", // 1일 단위 데이터
    });

    res.json({ status: "ok", values: result });
    console.log(res.json);
  } catch (error) {
    console.error("Yahoo Finance error:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
