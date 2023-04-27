import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Logo from "../../assets/TCI-name-logo.jpg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/summary");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-2 p-4">
      <div>
        <img
          className="object-scale-down object-center	h-48 w-96 items-center"
          src={Logo}
          alt="Techni-Connection"
        ></img>
        <h1 className="text-blue-400 text-5xl font-bold px-3 py-2 text-center capitalize">
          Sign in
        </h1>
        <h2 className="text-blue-400 text-2x1 font-bold text-center mt-4">
          Sign in and start manage your tickets!
        </h2>
      </div>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-lg border-zinc-700"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-lg border-zinc-700"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="border border-blue-400 rounded-lg bg-blue-600 hover:bg-blue-500 w-full mt-8 p-4 text-white">
          Sign In
        </button>
        <p className="mt-2 py-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="font-bold underline">
            Sign up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
