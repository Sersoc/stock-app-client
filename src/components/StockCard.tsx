import { Link } from "react-router-dom";
import StockChart from "./StockChart";

interface StockCardProps {
  userId: number;
  symbol: string;
}

export default function StockCard({userId, symbol }: StockCardProps) {
  

  async function handleFavorite(){
    await fetchData();
  }
  
    const fetchData = async() => {
      await fetch(`http://localhost:3002/api/db/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol,
        }),
      });
    }
  return (
    <div className="rounded-sm shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-xl/30">
      <h2 className="text-2xl font-bold p-2 text-center">{symbol}</h2>
      <button onClick={handleFavorite}>aaa</button>
      <Link to={`/stock/${symbol}`}>
        <section className="p-4 max-h-full max-w-full">
          <StockChart symbol={symbol} period="7" />
        </section>
      </Link>
    </div>
  );
}
