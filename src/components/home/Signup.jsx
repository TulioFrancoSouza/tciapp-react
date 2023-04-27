import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/TCI-name-logo.jpg";

const Signup = () => {
  return (
    <div className="max-w-[400px] mx-auto my-2 p-4">
      <div>
        <img
          className="object-scale-down object-center	h-48 w-96 items-center"
          src={Logo}
          alt="Techni-Connection"
        ></img>
        <h1 className="text-black text-center text-2xl py-2">
          To sign up send an email to slav@techniconnection.com.
        </h1>
        <p className="py-2 text-center">
          Already have an account yet?{" "}
          <Link to="/" className="font-bold underline">
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
