import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchItem, setSearchItem, user }) => {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="flex gap-2 md:ga pb-7 p-5 w-full mt-5">
      <div className="flex justify-start w-full items-center px-2 rounded-md bg-white border-none outline-none focus-within:shadow-ms">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-whiter border-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`}>
          <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
        </Link>
        <Link
          to={"create-pin"}
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 items-center justify-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
