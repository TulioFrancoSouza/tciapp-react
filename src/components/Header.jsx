import React from "react"
import Logo from "../assets/TCI-name-logo.jpg"
import ProfilePic from "../assets/Profile-pic.jpg"
import { Link, useLocation } from "react-router-dom"
import Search from "./summary/Search"
import Filter from "./summary/Filter"

const Header = () => {

  const location = useLocation();

  return (
    <div>
      <div className="em:block em:ml-5 em:mr-5	flex justify-between align-center mt-8 ml-14 mr-14 ">
        
        <Link to={location.pathname === "/summary" ? "/account" : "#" }>
          <div className="em:justify-start flex justify-evenly align-center">
            <img
              className="em:mt-0 object-scale-down h-9 w-18 rounded-full mt-1 mr-2"
              src={ProfilePic}
              alt="Techni-Connection"
            ></img>
            <h1 className="em:text-sm tex-black font-extrabold">
              Hello, <br></br>
              <span className="text-sm">Slav Morov</span>.
            </h1>
          </div>
        </Link>

        {location.pathname === "/summary" ? <Search search={Search} /> : null}
        {location.pathname === "/summary" ? <Filter /> : null}

        <div>
          <img
            className="em:hidden sm:object-sclae-down object-scale-down h-12 w-24"
            src={Logo}
            alt="Techni-Connection"
          ></img>
        </div>
      </div>
      <div>
        <hr class="em:ml-5 em:mr-5 my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
      </div>
    </div>
  );
};

export default Header;
