import React from "react";
import { motion } from "framer-motion";

const MotionDiv = (props) => {
  return (
    <motion.div
      className={props.className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}>
      {props.children}
    </motion.div>
  );
};

export default MotionDiv;
