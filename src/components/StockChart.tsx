import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { ChartData } from "chart.js";

ChartJS.register(...registerables);

interface StockData {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface ChartItem {
  x: string; // datetime
  y: number; // close price
}

interface StockChartProps{
  symbol : string;
}
export default function StockChart({symbol}:StockChartProps){
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);

  useEffect(() => {
    console.log("Symbol:", symbol);
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3002/api/chart/${symbol}`);
      const data = await response.json();

      if (data.status === "ok") {
        const points: ChartItem[] = data.values.map((item: StockData) => ({
          x: item.datetime,
          y: parseFloat(item.close), // 종가만 사용
        }));

        setChartData({
          labels: points.map((item) => item.x),
          datasets: [
            {
              label: "종가 (Close Price)",
              data: points.map((item) => item.y),
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.1,
            },
          ],
        });
      }
    };

    fetchData();
  }, [symbol]);

  if (!chartData) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>Stock Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};
