import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../asset/icons/Logo.png";
import { AiFillHome } from "react-icons/ai";
// import { IoIosArrowForward } from "react-icons/io";

const isNotActiveStyle =
  "flex item-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex item-center px-5 gap-3 font-extrabold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const categories = [
    {
      name: "Animal",
    },
    { name: "Gloceries" },
    { name: "Clothes" },
    { name: "Electronics" },
    { name: "Equipments" },
    { name: "Wallpapers" },
  ];

  return (
    <div className="flex flex-col justify-between bg-white overflow-y-scrikk h-full min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to={"/"}
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={Logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <AiFillHome />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/categories/ ${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`/user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            alt="user-profile"
            className="w-10 h-10 rounded-full"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
