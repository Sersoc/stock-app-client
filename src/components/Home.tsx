import { Link } from "react-router-dom";
import StockCard from "./StockCard";
const stockList = [
  ["SOXL", "AAPL"],
  ["PLTR", "336260.KQ"],
  ["PLTU", "SOXS"],
];
export default function Home() {
  return (
    <>
      <h2 className="text-5xl font-bold">Hi WelCome Stock Home</h2>
      <Link to = {`/db/1`}>Favorite</Link>
      <section className="grid grid-rows-2">
        {stockList.map((row, rowIndex) => (
          <section key={rowIndex} className="grid grid-cols-2 gap-3 p-2">
            {row.map((symbol) => (
              <StockCard symbol={symbol} />
            ))}
          </section>
        ))}
      </section>
    </>
  );
}
