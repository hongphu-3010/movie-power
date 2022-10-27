import React, { useEffect, useState } from "react";
import Button, { ButtonOuline } from "../components/Button";
import HeroSlide from "../components/HeroSlide";

// --------------
import { useSelector, useDispatch } from "react-redux";
import { typeActions } from "../store/type-slice";
import TypeMovie from "../components/TypeMovie";
import { useParams } from "react-router-dom";

import { UserAuth } from "../context/authContext";
import { db } from "../firebase";
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
// --------------
const Home = () => {
  // -----------

  const ditpatch = useDispatch();
  const type = useSelector((state) => state.type.type);
  const name = useSelector((state) => state.nameUser.name);
  const { user, logOut } = UserAuth();
  // const [type, setType] = useState("movie");
  const moveiId = doc(db, "users", `${user?.email}`);
  const setName = () => {
    updateDoc(moveiId, {
      name: name,
    });
  };
  //setName();
  const handleSetMovie = () => {
    ditpatch(typeActions.setType("movie"));
    //setType("movie");
  };
  const handleSetTv = () => {
    ditpatch(typeActions.setType("tv"));
    //setType("tv");
  };
  // ------------

  console.log("re-render home");

  return (
    <>
      <HeroSlide />
      <div className="px-[2rem] py-[2rem] flex justify-center items-center container-wrap">
        <ButtonOuline
          onClick={handleSetMovie}
          className={`lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1.5rem] md:text-3xl lg:text-4xl rounded-[10rem] ease-out cursor-pointer w-[120px] md:w-[150px] mr-[1rem] transition-all duration-500  ${
            type === "tv" ? "" : "bg-primary"
          }`}
        >
          Movies
        </ButtonOuline>
        <ButtonOuline
          onClick={handleSetTv}
          className={`lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1.5rem] md:text-3xl lg:text-4xl rounded-[10rem] ease-out cursor-pointer w-[120px] md:w-[150px] duration-500 ${
            type === "movie" ? "" : "bg-primary"
          }`}
        >
          TV Shows
        </ButtonOuline>
      </div>

      <TypeMovie />
    </>
  );
};

export default Home;
