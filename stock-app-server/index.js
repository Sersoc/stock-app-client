const cors = require('cors');
const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();
app.use(cors({
    exposedHeaders: [
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset'
    ]
  }));
const port = 3002;
const API_KEY = process.env.FINNHUB_API_KEY;

// 종목 정보 (예: AAPL)
app.get('/api/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol: symbol,
          token: API_KEY
        }
      });
  
      // Finnhub의 헤더를 클라이언트에게 전달
      const headerKeys = [
        'x-ratelimit-limit',
        'x-ratelimit-remaining',
        'x-ratelimit-reset',
      ];
      headerKeys.forEach(key => {
        const value = response.headers[key];
        if (value !== undefined) {
          res.setHeader(key, value);
        }
      });
  
      res.json(response.data);
      console.log("받은 헤더:", response.headers);

    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      res.status(500).send('Error fetching stock data');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
