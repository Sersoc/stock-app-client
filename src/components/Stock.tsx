// pages/Stock.tsx
// import { useEffect, useState } from "react";
import StockChart from "../components/StockChart";

// interface StockPoint {
//   time: string;
//   price: number;
// }

export default function Stock() {
//   const [chartData, setChartData] = useState<StockPoint[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch("http://localhost:3002/api/chart/SOXL");
//       const data = await res.json();

//       // finnhub candle API는 timestamp 배열 (t)과 가격 배열 (c)을 줘
//     //   const formatted = data.t.map((timestamp: number, i: number) => ({
//     //     time: new Date(timestamp * 1000).toLocaleTimeString(),
//     //     price: data.c[i]
//     //   }));

//     // //   setChartData(formatted);
//     // }

//     fetchData();
//   }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>SOXL 주가 그래프</h2>
      <StockChart/>
    </div>
  );
}
