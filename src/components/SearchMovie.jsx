import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const SearchMovie = ({ category }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      navigate(`/${category}/search/${keyword}`);
      setKeyword("");
    } else alert("Please try again !!! The search box cannot be empty");
  };
  useEffect(() => {
    const enterEvent = (e) => {
      if (e.keyCode === 13) {
        console.log("13");
        e.preventDefault();
        handleSearch();
      }
    };
    document.addEventListener("keydown", enterEvent);
    return () => {
      document.removeEventListener("keydown", enterEvent);
    };
  }, [keyword]);
  return (
    <div>
      <form
        action=""
        className="flex h-[4rem] mb-[3rem] py-[0.4rem] gap-[1rem] w-full"
      >
        <input
          className="w-full sm:w-[250px] md:w-[350px] px-[1rem] outline-none duration-500 rounded-xl text-black bg-transparent text-xl bg-gray-200"
          type="text"
          placeholder="Enter for Seach"
          value={keyword}
          onChange={handleInput}
        />
        <HiOutlineSearch
          className="bg-red-500 h-full w-[52px] rounded-2xl py-[5px] hover:bg-red-700 duration-500 "
          onClick={handleSearch}
        />
      </form>
    </div>
  );
};

export default SearchMovie;
