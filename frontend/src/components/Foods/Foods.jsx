import React from "react";
import { Link } from "react-router-dom";
import { foodTypes } from "../../data/data";
import MotionWrap from "../../wrapper/MotionWrap";
import Navbar from "../Navbar/Navbar";
import classes from "./foods.module.css";

const Foods = () => {
  return (
    <>
      <section className={`app__wrapper app__flex ${classes.container}`}>
        <div>
          {/* <img src={bgr}></img> */}
          <div className={classes.wrapper}>
            <div className={classes.title}>Discover the best food & drinks</div>
            <div className={classes.title}>
              <span>Recepies Here</span>
            </div>
            <div className={classes.foods}>
              {foodTypes.map((foodtype) => (
                <Link
                  to={`/foods/${foodtype.name}`}
                  key={foodtype.id}
                  className={classes.food}
                >
                  <h4>{foodtype.name}</h4>
                  <div className={classes.imgContainer}>
                    <img src={foodtype.img}></img>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MotionWrap(Foods, "foods");
