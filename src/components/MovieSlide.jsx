import React, { useEffect, useState } from "react";
import dbApi, { category, movieType } from "../api/dbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { apiConfig } from "../api/axiosCreate";
import CardMovie from "./CardMovie";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
const MovieSlide = (props) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        let response = null;
        const params = {};
        if (props.type !== "similar") {
          switch (props.category) {
            case category.movie:
              response = await dbApi.getMoviesList(props.type, { params });
              break;
            default:
              response = await dbApi.getTvList(props.type, { params });
          }
        } else {
          response = await dbApi.similar(props.category, props.id);
        }
        setMovies(response.data.results);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="movie_slide">
      <Swiper
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        navigation={true}
        modules={[Navigation, FreeMode]}
        speed={500}
        freeMode={true}
        slidesPerGroup={2}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <CardMovie movie={movie} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlide;

// 1:41
