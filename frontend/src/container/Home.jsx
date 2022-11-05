import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { Link, Routes, Route } from "react-router-dom";
import { userQuery } from "../utils/data";
import { client } from "../clients";
import Eagle from "../asset/icons/eagle.png";
import window from "../asset/icons/window.png";
import Sidebar from "../components/Sidebar";
import { useRef } from "react";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to={"/"}>
              <img src={window} alt="logo" className="w-20" />
            </Link>

            <Link to={`user-profile/${user?._id}`}>
              <img src={Eagle} alt="logo" className="w-20" />
            </Link>
          </div>
          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute flex w-full justify-end items-center px-6 p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>

              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
