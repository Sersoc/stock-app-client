import { Link } from "react-router-dom";
import StockChart from "./StockChart";
interface StockCardProps{
    symbol : string;
}
export default function StockCard({symbol}:StockCardProps) {
  return (
    <div className="border max-w-1/2 max-h-1/2 hover:border-sky-500 m-2">
        <h2 className="text-2xl font-bold">{symbol}</h2>
      <Link to={`/stock/${symbol}`}>
        <section className="p-4 max-h-full max-w-full">
          <StockChart symbol={symbol} period="7" />
        </section>
      </Link>
    </div>
  );
}
