const express = require("express");
const { getStockChartData } = require("../controllers/stockChartController");
const router = express.Router();

router.get("/:symbol/:period", async (req, res) => {
  const { symbol, period } = req.params;
  try {
    const data = await getStockChartData(symbol, period);
    res.json({ status: "ok", values: data });
    console.log(data);
  } catch (error) {
    console.error("Chart route error:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
