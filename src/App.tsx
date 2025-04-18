
import Stock from "./components/Stock";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";



function App() {


  return (
    <>
    
    <Router>
    <AppBar/>
      <Routes>
      
        <Route path="/" element = {<Home/>}/>
        <Route path="/stock/:ticker" element = {<Stock/>}/>
        <Route path="/db/:userId" element = {<Favorites />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
