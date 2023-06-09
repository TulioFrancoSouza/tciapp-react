import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";

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
      <div className="em:ml-5 em:mr-5 em:justify-start flex justify-start items-center flex-wrap text-xs text-left ml-14 mr-14 my-2 py-2">
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
      </div>
    </div>
  );
};

export default Account;
