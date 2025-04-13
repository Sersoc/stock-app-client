const cors = require("cors");
const express = require("express");
const axios = require("axios");
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
  const { symbol } = req.params;

  try {
    const response = await axios.get("https://api.twelvedata.com/time_series", {
      params: {
        symbol:symbol.toUpperCase(),
        interval: "5min",   // 분봉: 1min, 5min, 15min, 1h 등 가능
        outputsize: 100,    // 가져올 데이터 개수 (최대 5000)
        format: "JSON",
        apikey: CHART_API_KEY,
      },
    });

    if (response.data.status === "error") {
      return res.status(400).json({ error: response.data.message });
    }

    res.json(response.data);
    console.log(response.data);
  } catch (err) {
    console.error("Twelve Data API Error:", err.message);
    res.status(500).send("차트 데이터를 가져오는 중 오류 발생");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
