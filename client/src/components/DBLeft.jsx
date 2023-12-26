import React from "react";
import { Logo } from "../assets/Image";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/Styles";

const DBLeft = () => {
  return (
    <div
      className="h-full flex flex-col py-12 bg-cardOverlay backdrop-blur-md shadow-md
     min-w-210 max-300 gap-3"
    >
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-12" alt="Logo" />
        <p className="text-xl font-semibold">City</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/Orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/newitems"}
        >
          Add New Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>

      <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-400 flex flex-col items-center justify-center  gap-3 px-3">
          <div className="w-12 h-12  border bg-white rounded-full flex items-center justify-center">
            <p className="text-2x1 font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeft;
