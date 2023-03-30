import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";

const Account = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Link to='/ticketinfo'>
          <button className="max-w-[100px] border ml-14 border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-1 text-white">
            Back
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center flex-wrap text-left ml-14 mr-14 my-2 py-2">
        <div className="mr-4">
          <h2 className="font-bold">Name:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            Slav Morov
          </div>
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Company:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            Techni-Connection
          </div>
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Email:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            slav@techniconnection.com
          </div>
        </div>

        <div className="mr-4">
          <h2 className="font-bold">Phone:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            514-355-9288
          </div>
        </div>
        <div className="mr-4">
          <h2 className="font-bold">Address:</h2>
          <div className="mb-2 bg-gray-200 border p-2 rounded-lg border-zinc-700">
            1455 Saint Catherine Street, Montreal, H3R.
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="max-w-[100px] border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-700 w-full p-4 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
