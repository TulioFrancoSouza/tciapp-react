import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { UserService } from "../service/user/UserService";
import { useEffect, useState } from "react";

const Account = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const user = await UserService.user(token);

      setUser(user[0]);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="em:mr-0 flex justify-between mr-14">
        <Link to="/summary">
          <button className="em:ml-5 em:mr-5 max-w-[100px] border ml-14 border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-1 text-white">
            Back
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="em:ml-5 em:mr-5 max-w-[100px] border ml-14 border-red-400 rounded-lg bg-red-400 hover:bg-red-700 w-full p-1 text-white"
        >
          Logout
        </button>
      </div>
      <div className="flex-col em:ml-5 em:mr-5 em:justify-start flex justify-start items-start flex-wrap text-xs text-left ml-14 mr-14 my-2 py-2">
        <div className="flex w-full">
          {" "}
          <div className="mr-4 w-1/2">
            <h2 className="font-bold">Name:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {user.name}
            </div>
          </div>
          <div className=" w-1/2">
            <h2 className="font-bold">Company:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {user.company}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="mr-4 w-1/2">
            <h2 className="font-bold">Email:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {user.email}
            </div>
          </div>
          <div className=" w-1/2">
            <h2 className="font-bold">Phone:</h2>
            <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
              {user.phone}
            </div>
          </div>
        </div>

        <div className="w-full mr-4">
          <h2 className="font-bold">Address:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            {user.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
