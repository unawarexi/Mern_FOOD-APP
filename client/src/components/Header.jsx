import React from "react";
import { Link, NavLink, useNavigate} from "react-router-dom";
import { Avatar, Logo, Picture } from "../assets/Image";
import { isActiveStyles, isNotActiveStyles } from "../utils/Styles";
import { MdShoppingCart, MdLogout } from "../assets/icons/Icons";
import { motion } from "framer-motion";
import { FadeInOut, buttonClick, slideTop } from "../animations/Animation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/UserAction";

const Header = () => {
  const user = useSelector((state) => state.user);

  const [IsMenu, setIsMenu] = useState(false);

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
    <header
      className="fixed top-0 backdrop-blur-md z-50 inset-x-0 flex items-center justify-between
  px-12 md:px-20 py-4"
    >
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="Logo" />
        <p className="text-xl font-semibold">City</p>
      </NavLink>

      <nav className="flex  items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div {...FadeInOut} className="relative cursor-pointer ">
          <MdShoppingCart className="text-3xl text-textColor" />
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
            <p className="text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  src={user ? Picture : Avatar}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  alt="User Picture"
                  referrerPolicy="no-referrer"
                />
              </div>

              {IsMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 bg-cardOverlay backdrop-blur-md rounded-md shadow-md
                   absolute top-12 right-0 flex flex-col gap-4 w-48"
                >
                  <Link
                    className="hover:text-red-500 text-xl text-textColor "
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor "
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor "
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />

                  <motion.div
                    onClick={signOut}
                    {...buttonClick}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100
                      gap-3 hover:bg-gray-200"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
                    <p>Sign Out</p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-cardOverlay border
             border-red-300 cursor-pointer"
              >
                Log In
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
