import React from "react";
import { motion } from "framer-motion";
const MotionWrap = (Component, id) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        id={id}
        // className={`${classNames} app__flex`}
      >
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;
