import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { useState } from "react";
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="w-full h-screen">
      <img
        className=" sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b321426e-35ae-4661-b899-d63bca17648a/f2696419-dab5-4911-8df4-4f9426f09d62/VN-en-20220926-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="/"
      />
      <div className="bg-black/60 w-full h-screen fixed top-0 left-0 "></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto  bg-black/75 text-white rounded-md">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-4xl font-bold">Sign In</h1>
            {error ? (
              <p className="p-3 my-2 bg-red-400 rounded">{error}</p>
            ) : null}
            <form onSubmit={handleSubmit} className="flex w-full flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-5 my-2 bg-gray-700 rounded text-2xl"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-5 my-2 bg-gray-700 rounded text-2xl"
                type="password"
                placeholder="Password"
                autoCapitalize="curren-password"
              />
              <button className="bg-red-600 py-5 my-6 rounded font-bold text-2xl">
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p className="flex items-center text-[1.25rem]">
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p>
                <p className="text-[1.25rem]">Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-400 text-[1.25rem] mr-[1rem]">
                  New to Netflix?
                </span>
                <Link to="/signup" className="text-2xl">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

// 1:43:02
