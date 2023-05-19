import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clear } from "../../redux/cartSlice";
import Features from "../Features/Features";
import Foods from "../Foods/Foods";
import Footer from "../footer/Footer";
import Hero from "../Hero/Hero";
import Newsletter from "../Newsletter/Newsletter";
const Home = () => {
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Hero />
      <Foods />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
