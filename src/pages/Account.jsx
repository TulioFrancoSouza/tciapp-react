import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { UserService } from '../service/user/UserService';
import { useEffect, useState } from 'react';

const Account = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const user = await UserService.user(token);

      setUser(user[0]);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="md:mr-0 flex justify-between">
        <Link to="/summary">
          <button className="md:max-w-[100px] border ml-5 border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-900 w-full p-1 text-white">
            Back
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="md:ml-5 mr-5 max-w-[100px] border ml-14 border-red-600 rounded-lg bg-red-600 hover:bg-red-900 w-full p-1 text-white"
        >
          Logout
        </button>
      </div>
      <div className="md:flex-col ml-5 mr-5 justify-start flex justify-start items-start flex-wrap text-xs text-left ml-14 mr-14 my-2 py-2">
        <div className="flex w-full">
          {' '}
          <div className="mr-4 w-1/2">
            <h2 className="font-bold">Name:</h2>
            <div className="mb-2 h-8 bg-gray-100 border p-2 rounded-lg border-zinc-700">
              {user.name}
            </div>
          </div>
          <div className=" w-1/2">
            <h2 className="font-bold">Company:</h2>
            <div className="mb-2 h-8 bg-gray-100 border p-2 rounded-lg border-zinc-700">
              {user.company}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="mr-4 w-1/2">
            <h2 className="font-bold">Email:</h2>
            <div className="mb-2 h-8 bg-gray-100 border p-2 rounded-lg border-zinc-700">
              {user.email}
            </div>
          </div>
          <div className=" w-1/2">
            <h2 className="font-bold">Phone:</h2>
            <div className="mb-2 h-8 bg-gray-100 border p-2 rounded-lg border-zinc-700">
              {user.phone}
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="font-bold">Address:</h2>
          <div className="mb-2 h-8 bg-gray-100 border p-2 rounded-lg border-zinc-700">
            {user.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
