import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const TrailerModal = ({ id }) => {
  console.log("rerender-trailer");
  let modal, iframeTrailer;
  useEffect(() => {
    modal = document.querySelector(`.modal_${id}`);
    iframeTrailer = document.querySelector(`.trailer_${id}`);
  });

  const closeModal = () => {
    modal.classList.remove("top-0");
    iframeTrailer.setAttribute("src", "");
    document.querySelector("body").classList.remove("overflow-hidden");
  };
  return (
    <div className="relative">
      <div
        className={`modal_${id} fixed h-screen w-full top-[150%] bottom-0 bg-black flex justify-center items-center duration-500 z-[100]`}
      >
        <div className={`trailer_content_${id}`}></div>
        <div
          className={`absolute pt-[56.2%] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[100%]`}
        >
          <iframe
            className={`trailer_${id} absolute rounded-[1rem] shadow-itemShadownActive top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] h-[70%] w-[80%]`}
            width="80%"
            height="80%"
            src=""
          ></iframe>
        </div>
        <FaTimes
          onClick={closeModal}
          size={24}
          className="absolute right-[2rem] top-[2rem] hover:cursor-pointer opacity-60 hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default TrailerModal;
