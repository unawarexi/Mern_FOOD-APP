import React from "react";
import { LoginBg, Logo } from "../assets/Image";
import { LoginInput } from "../components/ExpComp";
import { useState } from "react";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons/Icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations/Animation";

const Login = () => {
  const [UserEmail, setUserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);

  const [password, setpassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/*===========  background image ==============*/}

      <img
        src={LoginBg}
        alt=""
        className="h-full w-full object-cover absolute top-0 left-0"
      />

      {/*===========  content box ==============*/}
      <div
        className=" flex flex-col items-center bg-cardOverlay w-[50%] md:w-508  h-full z-10
       p-4 px-4 py-12 gap-6 backdrop-blur-md "
      >
        {/* ================ LOGO ========== */}
        <div className="flex items-center justify-start gap-4 w-full ">
          <img src={Logo} className="w-8" alt="Logo" />
          <p className="text-headingColor text-2xl font-semibold">City</p>
        </div>

        {/* ================ welcome text ========== */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>

        <p className="text-xl text-textColor -mt-6">
          {!isSignUp ? "Sign in" : "Sign up"} with the following
        </p>

        {/* ================ INPUT SECTION ========== */}
        <div className="flex flex-col w-full items-center justify-center gap-6 px-4 md:px-12 py-4 ">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope className=" text-xl text-textColor" />}
            inputState={UserEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Input Password"}
            icon={<FaLock className=" text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className=" text-xl text-textColor" />}
              inputState={ConfirmPassword}
              inputStateFunc={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 bg-transparent underline cursor-pointer"
                onClick={() => setisSignUp(true)}
              >
                {" "}
                Create one!
              </motion.button>{" "}
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 bg-transparent underline cursor-pointer"
                onClick={() => setisSignUp(false)}
              >
                {" "}
                Sign-In
              </motion.button>{" "}
            </p>
          )}

          {/* ========== button section =========== */}
          {!isSignUp ? (
            <motion.div
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-center
           text-white text-xl capitalize hover:bg-red-500 transition-all duration-300 "
            >
              Sign in
            </motion.div>
          ) : (
            <motion.div
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-center
          text-white text-xl capitalize hover:bg-red-500 transition-all duration-300 "
            >
              Sign up
            </motion.div>
          )}
        </div>

        {/* ====== lines ========= */}
        <div className="flex items-center justify-between gap-16">
          <div className=" w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white"> Or</p>
          <div className=" w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        {/* ====== GOOGLE BUTTON ========= */}
        <motion.div
          {...buttonClick}
          className="flex items-center text-center justify-center px-20 py-2 rounded-full bg-cardOverlay 
          cursor-pointer backdrop-blur-md gap-4 hover:bg-white  transition-all duration-300 "
        >
          <FcGoogle className="w-8" />
          <p className="text-base capitalize text-headingColor">Sign in with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
