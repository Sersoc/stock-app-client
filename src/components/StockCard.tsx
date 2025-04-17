import { Link } from "react-router-dom";
import StockChart from "./StockChart";
interface StockCardProps{
    symbol : string;
}

export default function StockCard({symbol}:StockCardProps) {
  return (
    <div className="rounded-sm shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-xl/30">
        <h2 className="text-2xl font-bold p-2 text-center">{symbol}</h2>
      <Link to={`/stock/${symbol}`}>
        <section className="p-4 max-h-full max-w-full">
          <StockChart symbol={symbol} period="7" />
        </section>
      </Link>
    </div>
  );
}
