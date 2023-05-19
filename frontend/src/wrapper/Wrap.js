import React from "react";
import Navdots from "./Navdots";
const Wrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">@2022 YashKhamkar</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        <Navdots active={idName} />
      </div>
    );
  };

export default Wrap;
