import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";

import { useSelector, useDispatch } from "react-redux";
import { nameUserActions } from "../store/nameSliceUser";

import { db } from "../firebase";
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
function Signup() {
  const ditpatch = useDispatch();
  // const name = useSelector((state) => state.nameUser.name);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUp } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, name);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
              <h1 className="text-4xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  type="Name"
                  placeholder="Name"
                  className="px-3 py-5 my-2 bg-gray-700 rounded text-2xl"
                  onChange={
                    // (e) => ditpatch(nameUserActions.setName(e.target.value))
                    (e) => setName(e.target.value)
                  }
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-5 my-2 bg-gray-700 rounded text-2xl"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 py-5 my-2 bg-gray-700 rounded text-2xl"
                  type="password"
                  placeholder="Password"
                  autoCapitalize="curren-password"
                />
                <button className="bg-red-600 py-5 my-6 rounded font-bold text-2xl">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="flex items-center text-[1.25rem]">
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p className="text-[1.25rem]">Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-400 text-[1.25rem]">
                    Already subscribe to Netflix?
                  </span>
                  <Link to="/login" className="text-2xl ml-[1rem]">
                    {" "}
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
