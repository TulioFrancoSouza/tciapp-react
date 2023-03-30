import React from "react";
import Logo from "../assets/TCI-name-logo.jpg";
import ProfilePic from "../assets/Profile-pic.jpg";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";

const Header = () => {
  return (
    <div>
      <div className="flex justify-evenly align-center mt-8">
      <Link to="/account">
        <div className="flex justify-evenly align-center">
          <img
            className="object-scale-down h-9 w-18 rounded-full mt-1 mr-2"
            src={ProfilePic}
            alt="Techni-Connection"
          ></img>
          <h1 className="tex-black font-extrabold">
            Hello, <br></br>
            <span className="text-sm"> Slav</span>.
          </h1>
        </div>
      </Link>

      <div className="flex items-center">
        <input
          className="focus:bg-white focus:text-black focus:placeholder:text-white bg-gray-200 min-w-[400px] min-h-[40px] px-5 py-1 rounded-lg border-r-2"
          type="text"
          name="search"
          placeholder="Ticket number or keyword"
        />
        <div className="ml-3 w-5 h-5">
          <FcSearch />
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Pending
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Accepeted
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Review
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Closed
        </button>
      </div>

      <div>
        <img
          className="object-scale-down h-12 w-24"
          src={Logo}
          alt="Techni-Connection"
        ></img>
      </div>
    </div>
    <div>
    <hr
  class="my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
    </div>
    </div>
    
  );
};

export default Header;
