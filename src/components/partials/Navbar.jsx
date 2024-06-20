import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuSaveAll } from "react-icons/lu";
import { Link } from "react-router-dom";

function Navbar({ searchingFor, setSearchingFor }) {
  return (
    <nav className="flex items-center justify-between h-14 sm:px-10 px-0 bg-[#6FDCE3] fixed top-0 z-50 w-full">
      <Link to={"/"}>
        <h2 className="text-2xl font-bold">News Center</h2>
      </Link>
      <div className="flex items-center gap-5">
        <form className="border text-xl bg-white rounded-md">
          <input
            type="text"
            name="Search"
            className="p-[6px] outline-0 rounded-md sm:w-auto w-32"
            id="search"
            placeholder="Search here"
            value={searchingFor}
            onChange={(e) => {
              setSearchingFor(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mr-1"
          >
            <IoSearchOutline />
          </button>
        </form>
        <Link to="/fav">
          <LuSaveAll className="text-3xl" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
