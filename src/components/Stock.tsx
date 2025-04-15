// pages/Stock.tsx
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import StockChart from "../components/StockChart";

// interface StockPoint {
//   time: string;
//   price: number;
// }
interface StockQuote {
  c: number; // 현재가
  h: number; // 고가
  l: number; // 저가
  o: number; // 시가
  pc: number; // 전일 종가
}

interface RateLimit {
  remaining: number;
  total: number;
  reset: Date;
}
export default function Stock() {
  //   const [chartData, setChartData] = useState<StockPoint[]>([]);
  const [chartPeriod, setChartPeriod] = useState<string>("14");
  const [stock, setStock] = useState<StockQuote | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [ticker, setTicker] = useState<string>();
  const percent = stock
    ? (((stock.c - stock.pc) / stock.pc) * 100).toFixed(2)
    : undefined;

  function handleTicker(e: React.ChangeEvent<HTMLInputElement>) {
    setTicker(e.target.value);
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3002/api/stock/${ticker}`);
      const data = await res.json();

      setStock(data); // 주가 데이터
      setRateLimit({
        remaining: Number(res.headers.get("x-ratelimit-remaining")),
        total: Number(res.headers.get("x-ratelimit-limit")),
        reset: new Date(Number(res.headers.get("x-ratelimit-reset")) * 1000),
      });
    }
    fetchData();
  }, [ticker]);
  function handlePeriod(period: string) {
    setChartPeriod(period);
    console.log(period);
  }

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={handleTicker}
        // onKeyDown={handleTicker}
        placeholder="Input Ticker"
        className="text-xl font-bold "
      />
      {ticker && <h1>{ticker} 주가 정보</h1>}

      {stock ? (
        <div>
          <p>
            📈 현재가: {stock.c}({percent}%)
          </p>
          <p>🔺 고가: {stock.h}</p>
          <p>🔻 저가: {stock.l}</p>
          <p>🟢 시가: {stock.o}</p>
          <p>🕔 전일 종가: {stock.pc}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}

      {rateLimit ? (
        <>
          <p>
            남은 요청 수: <strong>{rateLimit.remaining}</strong> /{" "}
            {rateLimit.total}
          </p>
          <p>
            리셋 시간: <strong>{rateLimit.reset.toLocaleTimeString()}</strong>
          </p>
        </>
      ) : (
        <p></p>
      )}
      <StockChart symbol={ticker?ticker:""} startDate={chartPeriod} />
      <button onClick={() => handlePeriod("1")}>1day</button>
      <button onClick={() => handlePeriod("7")}>1week</button>
      <button onClick={() => handlePeriod("30")}>1month</button>
      <button onClick={() => handlePeriod("365")}>1year</button>
    </div>
  );
}
