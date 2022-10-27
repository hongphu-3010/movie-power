import React from "react";
import { apiConfig } from "../api/axiosCreate";
import { AiTwotoneStar } from "react-icons/ai";
import Button from "./Button";
import { Link } from "react-router-dom";
const Recommen = ({ name, rating, date, background, category, id }) => {
  const link = `/${category}/${id}`;
  return (
    <Link to={link} className="hover:opacity-75 duration-300">
      <div className="flex gap-[2rem] mb-[2rem]">
        <img
          src={apiConfig.w500Image(background)}
          alt=""
          className="w-[120px] shrink-0 h-[150px] bg-cover bg-center rounded-md"
        />
        <div className="py-[1.5rem]">
          <h3 className="text-4xl mb-[1.5rem]">{name}</h3>
          <h4 className="text-2xl text-gray-300 mb-[2rem]">{date}</h4>
          <Button className=" px-[1.5rem] py-[0.5rem] bg-red-800 flex gap-[0.5rem] justify-center items-center rounded-3xl">
            <p className="text-xl md:text-2xl">{rating.toFixed(1)}</p>
            <AiTwotoneStar className="text-2xl md:text-3xl" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Recommen;
