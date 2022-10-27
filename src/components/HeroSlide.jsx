import React, { useEffect, useState } from "react";
import dbApi, { category, movieType, tvType } from "../api/dbApi";
import { apiConfig } from "../api/axiosCreate";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button, { ButtonOuline } from "./Button";

import { useSelector, useDispatch } from "react-redux";

import { Pagination, Navigation } from "swiper";
import "swiper/css";
import TrailerModal from "./TrailerModal";

const HeroSlide = () => {
  // SwiperCore.use([Autoplay]);
  console.log("rerender-hero");
  const type = useSelector((state) => state.type.type);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      try {
        let reponse = null;
        if (type === category.movie) {
          reponse = await dbApi.getMoviesList(movieType.popular, {
            params,
          });
        } else {
          reponse = await dbApi.getTvList(tvType.popular, {
            params,
          });
        }
        const movieSliced = reponse.data.results.slice(5, 10);
        console.log(movieSliced);
        console.log(reponse);
        setMovies(movieSliced);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [type]);
  return (
    <div className="w-full relative overflow-hidden h-full">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        speed={700}
        loop={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <ItemHero
                item={movie}
                className={isActive ? "isActive" : ""}
                type={type}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movies.map((movie, index) => (
        <TrailerModal key={index} id={movie.id} />
      ))}
    </div>
  );
};
const ItemHero = ({ item, className, type }) => {
  let navigate = useNavigate();
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setShowModal = async () => {
    try {
      const modal = document.querySelector(`.modal_${item.id}`);
      const trailerContent = document.querySelector(
        `.trailer_content_${item.id}`
      );
      const iframeTrailer = document.querySelector(`.trailer_${item.id}`);
      const trailers = await dbApi.getVideos(type, item.id);
      const trailer = trailers.data.results;
      console.log(trailer);

      if (trailer.length > 0) {
        const trailerSrc = "https://www.youtube.com/embed/" + trailer[0].key;
        iframeTrailer.setAttribute("src", trailerSrc);
        console.log(iframeTrailer);
      } else {
        trailerContent.innerText = "NO TRAILER";
      }
      modal.classList.add("top-0");
      document.querySelector("body").classList.add("overflow-hidden");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`heorItem bg-cover bg-no-repeat w-full relative bg-center py-[10rem] before:overlay before:bg-overlay after:overlay after:bg-gradient-to-t after:from-[#0f0f0f] after:to-transparent container-wrap`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex justify-center items-center relative overflow-hidden">
        <div
          className={`${className} hero_wrap lg:w-[55%] px-[3rem] w-[100%] relative z-[1]`}
        >
          <h2
            className={`mb-[1rem] text-5xl md:text-6xl lg:text-8xl font-bold delay-[2s]`}
          >
            {item.title ?? item.name}
          </h2>
          <div className="mb-[5rem] text-xl lg:text-2xl truncateString md:noTruncate font-semibold text-gray-300">
            {item.overview || "No overview"}
          </div>
          <div className="mb-[2rem]">
            <Button
              onClick={() => navigate(`/${type}/` + item.id)}
              className="btn mr-[1.5rem] hover:translate-y-[-0.3rem] active:translate-y-[-0.1rem] rounded-[10rem]"
            >
              Watch now
            </Button>
            <ButtonOuline
              onClick={setShowModal}
              className="btn border-[2px] hover:translate-y-[-0.3rem] rounded-[10rem] active:translate-y-[-0.1rem]"
            >
              Watch trailer
            </ButtonOuline>
          </div>
        </div>

        <div
          className={`${className} hero_img hidden lg:flex flex-1 justify-start items-center relative z-[1] scale-0 transition-all duration-[1s]`}
        >
          <img
            onClick={() => navigate(`/${type}/` + item.id)}
            src={apiConfig.w500Image(item.poster_path)}
            alt=""
            className=" w-[400px] rounded-2xl hover:shadow-white hover:shadow-img_poster relative top-0 transition-top duration-500 hover:top-[-5px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default HeroSlide;
