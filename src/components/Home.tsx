import StockCard from "./StockCard";

export default function Home() {
  return (
    <>
      <h2 className="text-5xl font-bold">Hi WelCome Stock Home</h2>
      <StockCard symbol="SOXL"/>
      <StockCard symbol="AAPL"/>
      <StockCard symbol="PLTR"/>
      <StockCard symbol="336260.KQ"/>
    </>
  );
}
