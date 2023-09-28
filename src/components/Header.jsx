import React from 'react';
import Logo from '../assets/TCI-name-logo.jpg';
import ProfilePic from '../assets/Profile-pic.jpg';
import { Link, useLocation } from 'react-router-dom';
import Search from './summary/Search';
import Filter from './summary/Filter';
import { useWindowWidth } from '@react-hook/window-size';
import { useEffect, useState } from 'react';
import { UserService } from '../service/user/UserService';

const Header = () => {
  const width = useWindowWidth();
  const location = useLocation();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const user = await UserService.user(token);
      // console.log(user[0]['name']);
      setUser(user[0]);
    }
    fetchData();
  }, []);

  return (
    <div className="w-[100vw] md:w-[100%]">
      <div className="flex flex-col px-5 md:flex-row px-5 justify-between mt-8 items-center">
        <Link to={location.pathname === '/summary' ? '/account' : '#'}>
          <div className="flex justify-between w-[100%] md:ml-2 mr-8 items-center">
            <div className="flex justify-between md:justify-start">
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
        {location.pathname === '/summary' ? <Search /> : null}
        {location.pathname === '/summary' ? <Filter /> : null}
        <div>
          <img
            className="hidden md:block object-scale-down h-12 w-24"
            src={Logo}
            alt="Techni-Connection"
          ></img>
        </div>
      </div>
      <div>
        <hr className="mx-5 my-2 md:mx-5 h-0.5  border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
      </div>
    </div>
  );
};

export default Header;
