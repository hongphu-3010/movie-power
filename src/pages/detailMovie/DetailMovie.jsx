import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbApi from "../../api/dbApi";
import { apiConfig } from "../../api/axiosCreate";
import Button, { ButtonOuline } from "../../components/Button";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Casts from "./Casts";
import VideoList from "./VideoList";
import MovieSlide from "../../components/MovieSlide";

import { UserAuth } from "../../context/authContext";
import { db } from "../../firebase";
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
const DetailMovie = () => {
  const { user } = UserAuth();
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [like, setLike] = useState(false);
  const btnLike = useRef(null);
  const navigate = useNavigate();
  const [cast, setCast] = useState(true);
  let movies = [];
  // const handleClickLike = () => {
  //   if (!like) btnLike.current.classList.add("text-primary");
  //   else btnLike.current.classList.remove("text-primary");
  //   setLike(!like);
  // };
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const resp = await dbApi.detail(category, id, { params: {} });
        setItem(resp.data);
        console.log(resp.data);
        window.scrollTo(0, 0);
      } catch (error) {}
    };
    getMovieDetail();
  }, [category, id]);
  const bgBanner = apiConfig.originalImage(item?.backdrop_path);

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
  const moveiId = doc(db, "users", `${user?.email}`);
  const savedMovies = async (passedID) => {
    if (user?.email) {
      if (like) {
        // btnLike.current.classList.remove("text-primary");
        console.log(passedID);
        deleteShow(passedID);
        setLike(!like);
      } else {
        // btnLike.current.classList.add("text-primary");
        setLike(!like);

        await updateDoc(moveiId, {
          savedMovie: arrayUnion({
            id: item?.id,
            title: item?.title || item?.name,
            poster_path: item?.poster_path,
            category: category,
            vote_average: item?.vote_average.toFixed(1),
          }),
        });
      }
      // setLike(!like);
    } else {
      alert("Please Login !!!");
    }
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      movies = doc.data()?.savedMovie;
      movies?.forEach((movie) => {
        if (item?.id === movie.id) setLike(true);
      });
    });
  });
  return (
    <>
      <div
        className="h-[50vh] relative bg-cover bg-center bg-no-repeat after:overlay after:bg-gradient-to-t after:from-[#0f0f0f] after:to-[rgba(0,0,0,0)] after:bg-overlay"
        style={{ backgroundImage: `url(${bgBanner})` }}
      ></div>
      <div className="max-w-[1100px] mb-[3rem] mx-[1rem] md:mx-[2rem] flex lg:mx-auto mt-[-30vh] relative gap-[1rem] md:gap-[2rem]">
        <div
          className="bg-cover bg-center bg-no-repeat w-[200px] h-[300px] md:w-[260px] md:h-[360px] lg:w-[300px] lg:h-[425px] xl:w-[340px] xl:h-[500px]  rounded-2xl hidden md:block"
          style={{
            backgroundImage: `url(${apiConfig.originalImage(
              item?.poster_path
            )})`,
          }}
        ></div>

        <div className="flex-1 flex gap-y-[1rem] md:gap-y-[1.5rem] flex-col">
          <h3 className="text-5xl md:text-7xl lg:text-[5rem]">
            {item?.title || item?.name}
          </h3>
          <div className="">
            {item?.genres.map((genre, index) => (
              <ButtonOuline
                key={index}
                className="border border-primary px-[1.5rem] py-[0.2rem] md:px-[1.8rem] md:py-[0.4rem] mr-[1rem] rounded-[10rem] mb-[0.5rem] text-xl md:text-[1.6rem]"
              >
                {genre.name}
              </ButtonOuline>
            ))}
          </div>
          <div className="flex gap-[1rem]">
            <button
              ref={btnLike}
              onClick={() => savedMovies(item.id)}
              className=" border border-white flex items-center justify-center w-[30px] h-[30px] md:w-[40px] hover:border-primary duration-300 md:h-[40px]  rounded-full"
            >
              {like ? (
                <AiFillHeart className=" text-2xl md:text-4xl cursor-pointer text-primary" />
              ) : (
                <AiFillHeart className=" text-2xl md:text-4xl cursor-pointer" />
              )}
            </button>
            <button className="relative border border-white flex items-center justify-center w-[30px] h-[30px] md:w-[40px] hover:border-primary duration-300 md:h-[40px]  rounded-full">
              <AiOutlineShareAlt className="absolute text-2xl" />
            </button>
            <button className="relative border border-white flex items-center justify-center w-[30px] h-[30px] md:w-[40px] hover:border-primary duration-300 md:h-[40px]  rounded-full">
              <BiDotsHorizontalRounded className="absolute text-2x" />
            </button>
          </div>
          <h4 className="text-xl sm:text-[1.5rem] md:text-[1.8rem]">
            {item?.release_date
              ? `Release date:  ${item?.release_date} `
              : `Last air date:  ${item?.last_air_date}`}
          </h4>
          <p className="text-xl truncateString xl:truncateString lg:text-2xl xl:text-[1.8rem] xl:font-light">
            {item?.overview}
          </p>
          <Button
            className="btn mr-[1.5rem] hover:translate-y-[-0.3rem] active:translate-y-[-0.1rem] rounded-[10rem] w-[50%] xl:mt-[3rem] cursor-pointer"
            onClick={() => navigate(`/${category}/${id}/watch`)}
          >
            Watch
          </Button>
        </div>
      </div>
      <div className="max-w-[1100px] lg:mx-auto flex mx-[1rem] md:mx-[2rem] flex-col md:flex-row">
        <div className="flex justify-center gap-[4rem] md:flex-col xl:h-[40vh]">
          <div className="text-center md:text-left">
            <h3 className="text-4xl mb-[1rem]">Rating</h3>
            <div className="w-[70px] h-[70px] text-center mx-auto">
              <CircularProgressbar
                styles={buildStyles({
                  textSize: "3rem",
                  textColor: "#fff",
                  pathColor: "red",
                  pathTransitionDuration: 0.15,
                })}
                value={item?.vote_average}
                maxValue={10}
                text={`${item?.vote_average.toFixed(1)}`}
              />
            </div>
          </div>
          <div className="text-center md:text-left relative">
            <h3 className="text-4xl mb-[1rem]">
              {category === "movie" ? "Time" : "Type"}
            </h3>
            <div className="w-[200px] h-[50px] text-center mx-auto my-auto relative flex justify-center ">
              <h3 className="text-[2rem] absolute top-[50%] translate-y-[-50%] text-center">
                {category === "movie"
                  ? `${item?.runtime} min`
                  : `${item?.type}`}
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-[3rem] flex-1 overflow-hidden h-[40vh]">
          <ul className="flex justify-center text-4xl gap-x-[4rem] w-full py-[0.5rem] ">
            <li
              className={`cast_nav hover:cursor-pointer relative transition-top duration-500  ${
                cast ? "top-[-7px] active_cast" : "top-0"
              }`}
              onClick={() => setCast(true)}
            >
              Cast
            </li>
            <li
              className={`cast_nav hover:cursor-pointer relative transition-top duration-500 ${
                cast ? "top-0" : " top-[-7px] active_cast"
              }`}
              onClick={() => setCast(false)}
            >
              Over View
            </li>
          </ul>
          {cast ? (
            <div className="max-h-[40v] overflow-hidden">
              <Casts id={id} />
            </div>
          ) : (
            <div className="py-[1rem] max-h-[40vh] overflow-auto">
              <h3 className="text-center font-bold text-[1.5rem] sm:text-[1.7rem]">
                {item?.tagline}
              </h3>
              <div>
                <h3 className="text-[1.5rem] font-semibold sm:text-[1.6rem] mb-[0.6rem] md:text-[2rem]">
                  Strory:
                </h3>
                <p className="text-xl sm:text-[1.4rem] font-light text-gray-300">
                  {item?.overview}
                </p>
              </div>
              <div>
                <h3 className="text-[1.5rem] font-semibold mt-[1.5rem] sm:text-1.6rem mb-[0.6rem] md:text-[2rem]">
                  DETAILS
                </h3>
                <div className="text-xl font-light text-gray-300 sm:text-[1.6rem]">
                  <p className="mb-[0.2rem]">{`Status: ${item?.status}`}</p>
                  <p className="mb-[0.2rem]">
                    {" "}
                    {item?.release_date
                      ? `Release date:  ${item?.release_date} `
                      : `Last air date:  ${item?.last_air_date}`}
                  </p>
                  <p className="mb-[0.2rem]">
                    {`Spoken Languge: ${item?.spoken_languages[0]?.english_name}`}{" "}
                  </p>
                  <p className="mb-[0.2rem]">{`Vote Count: ${item?.vote_count}`}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container-wrap mt-[2rem] md:mt-[4rem]">
        <div className="px-[1rem] md:px-[2rem]">
          <h3 className="text-[2rem] md:text-[2.8rem]">Trailers :</h3>
          <VideoList id={id} />
        </div>
        <div className="px-[1rem] md:px-[2rem] mt-[1rem]">
          <div className="section__header mb-2">
            <h2 className="text-[2rem] md:text-[2.8rem]">Similar:</h2>
          </div>
          <MovieSlide category={category} type="similar" id={id} />
        </div>
      </div>
    </>
  );
};

export default DetailMovie;
