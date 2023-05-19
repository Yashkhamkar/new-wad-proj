import React from "react";
import Lottie from "react-lottie";
import { AiOutlineArrowDown } from "react-icons/ai";
import delivery from "../../assets/delivery.json";
import classes from "./hero.module.css";
import swal from "sweetalert";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
// import man from "../assets/man.svg";
const Hero = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: delivery,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section style={{ height: "100vh" }} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h1 className={classes.title}>Tasty Food Recipies</h1>
          <h1 className={classes.title}>Anytime Anywhere</h1>
          <p className={classes.firstMsg}>
            Make Your Food Anytime <span>And...</span>
          </p>
          <p className={classes.secondMsg}>
            It will be very tasty <span>And delicious</span>
          </p>
          <div className={classes.buttons}>
            <button
              className={classes.buttonSee}
              onClick={() => {
                user
                  ? navigate("/cart")
                  : swal({ title: "You need to login", icon: "warning" });
              }}
            >
              Buy now!
              {/* <Link to="/cart">Buy now!</Link> */}
              {/* <Link
                onClick={() => {
                  user
                    ? navigate("/cart")
                    : swal({ title: "You need to login", icon: "warning" });
                }}
              >
               
              </Link> */}
            </button>
            <button className={classes.buttonSee}>
              <a href="#foods">
                See what's available <AiOutlineArrowDown />{" "}
              </a>
            </button>
          </div>
        </div>
        <div className={classes.right}>
          <Lottie options={defaultOptions} height={400} width={600} />
        </div>
      </div>
    </section>
  );
};

export default MotionWrap(Hero, "home");
