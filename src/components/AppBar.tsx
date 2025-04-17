import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <>
      <header className="bg-blue-300 text-center ">
        <Link to={`/`}>
          <span className="font-bold text-white text-2xl p-2">StockApp</span>
        </Link>
      </header>
    </>
  );
}
