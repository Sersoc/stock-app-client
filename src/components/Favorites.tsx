import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { useParams } from "react-router-dom";
interface favorite {
  symbol: string;
}
interface favoriteData {
  id: number;
  userId: number;
  symbol: string;
}
export default function Favorites() {
  const [favorites, setFavorites] = useState<favorite[]>([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3002/api/db/${userId}`);
      const data = await response.json();

      setFavorites(data.map((item: favoriteData) => ({ symbol: item.symbol })));
    };

    fetchData();
  }, [userId]);
  return (
    <>
      <section className="grid grid-rows-2">
        {favorites ? (
          <section className="grid grid-cols-2 gap-3 p-2">
            {favorites.map((row) => (
              <StockCard symbol={row.symbol} />
            ))}
          </section>
        ) : (
          <div>Not yet</div>
        )}
      </section>
    </>
  );
}
