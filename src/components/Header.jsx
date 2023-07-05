import React from "react";
import Logo from "../assets/TCI-name-logo.jpg";
import ProfilePic from "../assets/Profile-pic.jpg";
import { Link, useLocation } from "react-router-dom";
import Search from "./summary/Search";
import Filter from "./summary/Filter";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import { UserService } from "../service/user/UserService";


const Header = () => {
  const width = useWindowWidth();
  const location = useLocation();
  const [ user,setUser ] = useState([]);

  useEffect(() =>{

    async function fetchData() {
      const token = localStorage.getItem('token');
      const user = await UserService.user(token);
      // console.log(user[0]['name']);
       setUser(user[0]);
    }
    fetchData();
  }, [])

  return (
    <div>
      <div className="em:block em:ml-5 em:mr-5	flex justify-between align-center mt-8 ml-14 mr-14 ">
        <Link to={location.pathname === "/summary" ? "/account" : "#"}>
          <div className="em:ml-8 em:mr-8 em:justify-between flex justify-evenly align-center">
            <div className="em:flex flex">
              <img
                className="em:mt-0 object-scale-down h-9 w-18 rounded-full mt-1 mr-2"
                src={ProfilePic}
                alt="Techni-Connection"
              ></img>
              <h1 className="em:text-sm tex-black font-extrabold">
                Hello, <br></br>
                <span className="text-sm"> {user.name}</span>.
              </h1>
            </div>
            {width < 400 ? (
              <div>
                <img
                  className="object-scale-down h-9 w-18"
                  src={Logo}
                  alt="Techni-Connection"
                ></img>
              </div>
            ) : null}
          </div>
        </Link>

        {location.pathname === "/summary" ? <Search /> : null}
        {location.pathname === "/summary" ? <Filter /> : null}

        <div>
          <img
            className="em:hidden object-scale-down h-12 w-24"
            src={Logo}
            alt="Techni-Connection"
          ></img>
        </div>
      </div>
      <div>
        <hr class="em:ml-8 em:mr-8 my-6 h-0.5 ml-14 mr-14 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
      </div>
    </div>
  );
};

export default Header;
