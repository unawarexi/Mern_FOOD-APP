import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInOut } from "../animations/Animation";

const LoginInput = ({
  placeHolder,
  icon,
  type,
  inputState,
  inputStateFunc,
  isSingUp,
}) => {
  const [isFocus, setisFocus] = useState(false);

  return (
    <motion.div
     {...FadeInOut}
      className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full
    px-4 py-2 ${isFocus ? "shadow-md shadow-red-500" : "shadow-none"}`}
    >
      {icon}

      <input
        type={type}
        placeholder={placeHolder}
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none
        "
      />
    </motion.div>
  );
};

export default LoginInput;
