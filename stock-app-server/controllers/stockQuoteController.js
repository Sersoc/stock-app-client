const axios = require("axios");

const getStockQuotesData = async (symbol) => {
  const API_KEY = process.env.FINNHUB_API_KEY;
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: API_KEY,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { getStockQuotesData };
