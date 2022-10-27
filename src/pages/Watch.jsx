import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dbApi from "../api/dbApi";
import { apiConfig } from "../api/axiosCreate";
import Reviewers from "../components/Reviewers";
import Recommen from "../components/Recommen";
import { ButtonOuline } from "../components/Button";
import { useNavigate } from "react-router-dom";
const Watch = () => {
  const { id, category } = useParams();
  const [item, setItem] = useState();
  const [reviews, setReviews] = useState([]);
  const [recommen, setRecommen] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const resp = await dbApi.detail(category, id, { params: {} });
        setItem(resp.data);
        window.scrollTo(0, 0);
      } catch (error) {}
    };
    const getReview = async () => {
      try {
        const resp = await dbApi.getReviews(category, id, { params: {} });
        setReviews(resp.data.results);
        console.log(reviews);
      } catch (error) {}
    };
    const getRecommen = async () => {
      try {
        const resp = await dbApi.getRecommen(category, id, { params: {} });
        setRecommen(resp.data.results.slice(0, 4));
      } catch (error) {}
    };
    getMovieDetail();
    getReview();
    getRecommen();
  }, [category, id]);
  return (
    <div className="container-wrap pb-[3rem]">
      <div className="flex flex-col gap-x-[3.5rem] xl:flex-row mx-[1rem] mt-header-height">
        <div className="flex-grow">
          <div className="relative h-0 pb-[56%]">
            <iframe
              src={`https://www.2embed.to/embed/tmdb/${category}?id=${id}${
                category === "movie" ? null : "&s=1&e=1"
              }`}
              frameBorder="0"
              className="absolute top-0 left-0 !h-full !w-full"
            ></iframe>
          </div>
          <h3 className="text-4xl my-[1rem]">{item?.name || item?.title}</h3>
          <h3 className="text-3xl">Reviews:</h3>
          <div className="">
            {reviews?.map((review, index) => (
              <Reviewers
                key={index}
                userName={review.author_details.username}
                content={review.content}
                avatar={review.author_details?.avatar_path}
              />
            ))}
          </div>
        </div>
        <div className="w-full shrink-0 xl:w-[25%]">
          <h3 className="text-4xl mb-[1rem]">Recommend :</h3>
          {recommen?.map((item, index) => (
            <Recommen
              key={index}
              name={item?.title || item?.name}
              background={item?.poster_path}
              rating={item?.vote_average}
              date={item?.first_air_date || item?.release_date}
              id={item.id}
              category={category}
            />
          ))}
          <ButtonOuline
            className="w-full border border-primary rounded-3xl cursor-pointer md:text-3xl py-[0.5rem]"
            onClick={() => navigate(`/${category}`)}
          >
            See more
          </ButtonOuline>
        </div>
      </div>
    </div>
  );
};

export default Watch;
