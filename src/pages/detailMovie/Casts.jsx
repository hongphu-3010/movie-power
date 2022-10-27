import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConfig } from "../../api/axiosCreate";
import dbApi from "../../api/dbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
const Casts = ({ id }) => {
  const [casts, setCasts] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    const getCasts = async () => {
      try {
        const resp = await dbApi.credits(category, id);
        console.log(resp.data.cast);
        setCasts(resp.data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getCasts();
  }, [category, id]);
  return (
    <div className="casts_slide overflow-hidden">
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
        {casts?.map((cast, index) => (
          <SwiperSlide key={index}>
            <img
              className="bg-cover h-[160px] w-full rounded-lg sm:h-[170px] md:h-[200px] lg:h-[220px]"
              src={apiConfig.w500Image(cast?.profile_path)}
              alt=""
            />
            <p className="text-xl mt-[1rem] md:text-2xl lg:text-[2.1rem] font-light">
              {cast?.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Casts;
