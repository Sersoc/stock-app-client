const express = require("express");
const {getStockQuotesData} = require("../controllers/stockQuoteController");
const headerKeys = [
  "x-ratelimit-limit",
  "x-ratelimit-remaining",
  "x-ratelimit-reset",
];


const router = express.Router();

router.get("/:symbol", async (req, res) => {
    const symbol = req.params.symbol;
    try {
      
      const response = await getStockQuotesData(symbol);
       
      
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

  module.exports = router;