import React from "react";
import classes from "./footer.module.css";
import { BsHouseDoorFill } from "react-icons/bs";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineMail,
  AiFillPhone,
} from "react-icons/ai";
import instagram from "../../assets/instagram.json";
import facebook from "../../assets/facebook.json";
import twitter from "../../assets/twitter.json";
import Lottie from "react-lottie";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: instagram,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: facebook,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: twitter,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Footer = () => {
  return (
    <section id="" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2 className={classes.title}>Contact</h2>
          <ul className={classes.list}>
            <li>
              <BsHouseDoorFill />
              &nbsp; Pune, Maharashtra, IN
            </li>
            <li className>
              <AiOutlineMail />
              &nbsp; yashkhamkar1100@gmail.com
            </li>
            <li>
              <AiFillPhone />
              &nbsp; +91-9970036897
            </li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Newsletter</h2>
          <ul className={classes.list}>
            <li>Subscribe to our newsletter</li>
            <li>Receive the latest meals</li>
            <li>Get the menu with promos</li>
            <li>Everything weekly!</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Social Media</h2>
          <ul className={classes.iconList}>
            <li>
              <a href="https://www.instagram.com/xassh__/" target="_blank">
                <Lottie options={defaultOptions} height={40} width={40} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/yash.khamkar.33/"
                target="_blank"
              >
                <Lottie options={defaultOptions2} height={50} width={50} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Khamkaryash10" target="_blank">
                <Lottie options={defaultOptions3} height={40} width={40} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
