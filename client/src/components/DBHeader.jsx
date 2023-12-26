import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsFillBellFill,
  BsToggles2,
  MdLogout,
  MdSearch,
} from "../assets/icons/Icons";
import { buttonClick } from "../animations/Animation";
import { motion } from "framer-motion";
import { Avatar, Picture } from "../assets/Image";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/UserAction";

const DBHeader = () => {
  const user = useSelector((state) => state.user);

  
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull())
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">
        Welcome to City
        {user?.name && (
          <span className="block text-base text-gray-500">{`Hello ${user?.name}...!`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div
          className=" flex items-center justify-center gap-3 px-4 py-2 bg-cardOverlay backdrop-blur-md
         rounded-md shadow-md "
        >
          <MdSearch className="text-gray-400  tsxt-2xl " />
          <input
            type="text"
            placeholder="Search Here..."
            className=" border-none outline-none bg-transparent w-32 text-base font-semibold
             text-textColor"
          />
          <BsToggles2 className="text-gray-400  tsxt-2xl " />
        </div>

        <motion.div
          {...buttonClick}
          className=" w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md shadow-md flex 
          justify-center items-center"
        >
          <BsFillBellFill className="text-gray-500 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user ? Picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...buttonClick}
            onClick={signOut}
            className="w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-400 text-x1" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
