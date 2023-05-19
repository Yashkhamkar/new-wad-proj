import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./Auth/Auth";
import Home from "./components/Home/Home";
import { useEffect, useState } from "react";
import Create from "./components/Create/Create";
import Catalog from "./components/Catalog/Catalog";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Afterpayment from "./components/Payment/Afterpayment";
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <div>
        {location.pathname === "/auth" ? null : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/foods/:id" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/food/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Afterpayment />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
