import React, { useEffect, useState } from "react";
import CardMovie from "../components/CardMovie";
import { FaTimesCircle } from "react-icons/fa";
import { UserAuth } from "../context/authContext";
import { db } from "../firebase";

import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";
const Account = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovie);
      console.log(movies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovie: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-wrap">
        <div className="w-full text-white relative">
          <img
            className="w-full h-[100px] md:h-[200px] object-cover opacity-50"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/b321426e-35ae-4661-b899-d63bca17648a/f2696419-dab5-4911-8df4-4f9426f09d62/VN-en-20220926-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="/"
          />
          <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-4xl">
            My Movies
          </h3>
        </div>
        <div className="mx-[1rem] md:mx-[2rem] mt-[2rem] mb-[3rem]">
          <div className="grid grid-cols-allMovie gap-x-[10px] md:gap-x-[20px] gap-y-[3rem] md:grid-cols-allMovieTablet lg:grid-cols-allMoviePc  ">
            {movies?.map((movie, index) => (
              <div className="relative" key={index}>
                <FaTimesCircle
                  className="absolute z-50 text-3xl hover:text-primary opacity-60 duration-300 cursor-pointer"
                  onClick={() => deleteShow(movie.id)}
                />

                <CardMovie movie={movie} category={movie.category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
