import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderCategory from "../components/HeaderCategory";
import { category as cate } from "../api/dbApi";
import AllMovie from "../components/AllMovie";
const Catalog = () => {
  const [test, setTest] = useState("");
  const { category } = useParams();
  console.log(category);

  return (
    <div>
      <HeaderCategory>
        {category === cate.movie ? "All Movie" : "All TV Show"}
      </HeaderCategory>
      <div className="container-wrap">
        <div className="px-[1rem] md:px-[2rem] py-[4rem] ">
          <AllMovie category={category} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
