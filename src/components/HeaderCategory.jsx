import React from "react";
import bgHeader from "../assest/imgs/bg_header.jpg";
const HeaderCategory = (props) => {
  return (
    <div
      className="page-header relative pt-[10rem] md:pt-[15rem] lg:pt-[20rem] pb-[2rem] bg-center bg-cover bg-no-repeat after:overlay after:bg-gradient-to-t after:from-[#0f0f0f] after:to-transparent "
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <h2 className="absolute left-[50%] translate-x-[-50%] text-red-900 top-[60%] text-3xl md:text-4xl lg:text-5xl font-bold z-[99]">
        {props.children}
      </h2>
    </div>
  );
};

export default HeaderCategory;
