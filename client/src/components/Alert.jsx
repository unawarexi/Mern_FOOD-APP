import React from "react";
import { motion } from "framer-motion";
import { FadeInOut } from "../animations/Animation";
import { BsExclamationTriangleFill, FaCheck } from "./../assets/icons/Icons.jsx";

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div
        {...FadeInOut}
        className=" fixed rounded-md z-50  bg-emerald-300 backdrop-blur-md flex items-center
         gap-4 right-12 top-32 px-4 py-2 shadow-md"
      >
        <FaCheck className="text-xl text-emerald-700 " />
        <p className="text-xl text-emerald-700 ">{message}</p>
      </motion.div>
    );
  }

  {/**============ for warning ====================== */}
  if (type === "warning") {
    return (
      <motion.div
        {...FadeInOut}
        className=" fixed rounded-md z-50  bg-orange-300 backdrop-blur-md flex items-center
         gap-4 right-12 top-32 px-4 py-2 shadow-md"
      >
        <BsExclamationTriangleFill className="text-xl text-orange-700" />
        <p className="text-xl text-orange-700 ">{message}</p>
      </motion.div>
    );
  }

  {/**============ for danger ====================== */}
  if (type === "danger") {
    return (
      <motion.div
        {...FadeInOut}
        className=" fixed rounded-md z-50  bg-red-300 backdrop-blur-md flex items-center
         gap-4 right-12 top-32 px-4 py-2 shadow-md"
      >
        <BsExclamationTriangleFill className="text-xl text-red-700 " />
        <p className="text-xl text-red-700 ">{message}</p>
      </motion.div>
    );
  }

  {/**============ for info ====================== */}
  if (type === "info") {
    return (
      <motion.div
        {...FadeInOut}
        className=" fixed rounded-md z-50  bg-blue-300 backdrop-blur-md flex items-center
         gap-4 right-12 top-32 px-4 py-2 shadow-md"
      >
        <FaCheck className="text-xl text-blue-700 " />
        <p className="text-xl text-blue-700 ">{message}</p>
      </motion.div>
    );
  }
};

export default Alert;
