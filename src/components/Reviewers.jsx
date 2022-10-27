import React from "react";
import { apiConfig } from "../api/axiosCreate";
const Reviewers = ({ avatar, userName, content }) => {
  return (
    <>
      <div className="mt-[1.5rem]">
        <div className="avatar flex flex-grow items-center gap-[1rem]">
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={apiConfig.originalImage(avatar)}
            alt=""
          />
          <h2 className="name text-2xl">{userName}</h2>
        </div>
        <div className="content w-[100%]">
          <h3 className="content text-gray-400 text-xl truncateString">
            {content}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Reviewers;
