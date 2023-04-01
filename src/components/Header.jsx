import React from "react"
import Logo from "../assets/TCI-name-logo.jpg"
import ProfilePic from "../assets/Profile-pic.jpg"
import { Link, useLocation } from "react-router-dom"
import Search from "./Search"
import Filter from "./Filter"

const Header = () => {

  const location = useLocation();

  return (
    <div>
      <div className="flex justify-between align-center mt-8 ml-14 mr-14 ">
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

        {location.pathname === "/summary" ? <Search search={Search} /> : null}
        {location.pathname === "/summary" ? <Filter /> : null}

        <div>
          <img
            className="object-scale-down h-12 w-24"
            src={Logo}
            alt="Techni-Connection"
          ></img>
        </div>
      </div>
      <div>
        <hr class="my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
      </div>
    </div>
  );
};

export default Header;
