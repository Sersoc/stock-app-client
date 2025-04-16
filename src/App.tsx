
import Stock from "./components/Stock";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./components/Home";



function App() {


  return (
    <>
    <AppBar></AppBar>
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/stock/:ticker" element = {<Stock/>}/>
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
