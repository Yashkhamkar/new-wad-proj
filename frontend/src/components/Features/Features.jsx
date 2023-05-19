import React from "react";
import { motion } from "framer-motion";
import "./features.css";
import illustration1 from "../../assets/illustration1.svg";
import illustration2 from "../../assets/illustration2.svg";
import illustration3 from "../../assets/illustration3.svg";
import illustration4 from "../../assets/cooking-food.jpg";
import Wrap from "../../wrapper/Wrap";
import MotionWrap from "../../wrapper/MotionWrap";
import Navbar from "../Navbar/Navbar";
const Features = () => {
  const abouts = [
    {
      title: "Delivery In less than a week",
      description:
        "We Deliver Fastest as compared to our competitors",
      image: illustration1,
    },
    {
      title: "Real-Time GPS Tracking",
      description: "You Can Track your delivery partner on your device",
      image: illustration2,
    },
    {
      title: "Great Deals And Discounts",
      description: "We Provide Great Deals And Discounts as compared to others",
      image: illustration3,
    },
    {
      title: "Delicious Food Recepies",
      description: "We Provide delicious food recepie books with affordable price",
      image: illustration4,
    },
  ];
  return (
    <>
      <section
        id="feature"
        className="app__about app__wrapper app__flex"
        style={{ height: "100vh" }}
      >
        <h2 className="head-text">
          Why Choose <span>Us ??</span>
        </h2>
        <div className="app__profiles  app__container">
          {abouts.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title + index}
            >
              <img src={about.image} />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {about.title}
              </h2>
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

// export default Wrap(Features,"feature");
export default MotionWrap(Features);
