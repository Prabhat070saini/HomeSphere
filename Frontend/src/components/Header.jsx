import React from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
          <Link to="/">
            <span className="text-slate-500">Home</span>
            <span className="text-slate-f00">Sphere</span>
          </Link>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center  ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent  focus:outline-none w-24 sm:w-64"
          />

          <IoIosSearch className="text-slate-500" />
        </form>
        <div>
          <ul className=" flex gap-4">
            <li className="hidden sm:inline text-slate-800 hover:text-slate-500 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hidden sm:inline  text-slate-800 hover:text-slate-500 cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className="  text-slate-800 hover:text-slate-500 hover:transition-[0.3s]  cursor-pointer">
              <Link to="/sign-in"> Singin</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
