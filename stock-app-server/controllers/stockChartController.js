const yahooFinance = require("yahoo-finance2").default;

const getStockChartData = async (symbol, period) => {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: new Date(Date.now() - 1000 * 60 * 60 * 24 * period),
      period2: new Date(),
      interval: "1d",
    });

    return result;
  } catch (error) {
    console.error("Yahoo Finance error:", error.message);
    throw error; // 라우터에서 처리
  }
};

module.exports = { getStockChartData };
