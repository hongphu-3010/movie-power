import React from "react";
import { ButtonOuline } from "./Button";
import MovieSlide from "./MovieSlide";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { category, tvType, movieType } from "../api/dbApi";
const TypeMovie = () => {
  const type = useSelector((state) => state.type.type);
  return (
    <>
      {type === "movie" && (
        <>
          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">Popular Movies</h2>
                <Link to="/movie">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.2rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide category={category.movie} type={movieType.popular} />
            </div>
          </div>

          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">Top Rated Movies</h2>
                <Link to="/movie">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.3rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide
                category={category.movie}
                type={movieType.top_rated}
              />
            </div>
          </div>

          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">Upcoming Movies</h2>
                <Link to="/movie">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.3rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide category={category.movie} type={movieType.upcoming} />
            </div>
          </div>
        </>
      )}

      {type === "tv" && (
        <>
          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">Popular Tv Shows</h2>
                <Link to="/tv">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.3rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide category={category.tv} type={tvType.popular} />
            </div>
          </div>

          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">Top Rated Tv Shows</h2>
                <Link to="/tv">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.3rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide category={category.tv} type={tvType.top_rated} />
            </div>
          </div>

          <div className="container-wrap">
            <div className="px-[1rem] md:px-[2rem] mb-[5rem]">
              <div className="flex justify-between items-center  mb-[2rem]">
                <h2 className="type_title">On The Air Tv Shows</h2>
                <Link to="/tv">
                  <ButtonOuline className="lg:py-[0.5rem] lg:px-[1.5rem] py-[0.2rem] px-[1rem] text-[1rem] lg:text-[1.3rem] rounded-[10rem] ease-out cursor-pointer border-[1px]">
                    View all
                  </ButtonOuline>
                </Link>
              </div>
              <MovieSlide category={category.tv} type={tvType.on_the_air} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TypeMovie;
