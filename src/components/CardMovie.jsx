import React from "react";
import { Link } from "react-router-dom";
import { apiConfig } from "../api/axiosCreate";
import { category } from "../api/dbApi";
import Button from "./Button";
import { BsPlayFill } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
const CardMovie = (props) => {
  const movie = props.movie;
  const link = "/" + category[props.category] + "/" + movie.id;
  const bg = apiConfig.w500Image(
    movie.poster_path ? movie.poster_path : movie.backdrop_path
  );
  return (
    <Link to={link} className="rounded-[1rem] group select-none">
      <div
        className="relative bg-top bg-no-repeat bg-cover pt-[160%] rounded-[1rem] mb-[1rem] overflow-hidden group"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Button className="btn_play absolute top-[-130%] group-hover:top-[50%] group-hover:opacity-100 opacity-0 transition-top duration-700 left-[50%] translate-x-[-50%] translate-y-[-50%] px-[2rem] py-[1rem] rounded-[2rem] bg-primary after:bg-primary btn">
          <BsPlayFill size={24} />
        </Button>
        <Button className="absolute top-[1rem] right-[2rem] px-[1.5rem] py-[0.5rem] bg-red-800 flex gap-[0.5rem] justify-center items-center rounded-3xl">
          <p className="text-xl md:text-2xl">{movie.vote_average}</p>
          <AiTwotoneStar className="text-2xl md:text-3xl" />
        </Button>
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 group-hover:opacity-50 opacity-0"></div>
      </div>
      <h3 className="text-gray-300 text-xl md:text-[1.7rem] lg:text-3xl group-hover:text-primary ">
        {movie.title || movie.name}
      </h3>
    </Link>
  );
};

export default CardMovie;
