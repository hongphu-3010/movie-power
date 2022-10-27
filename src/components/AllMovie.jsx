import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMovie from "./CardMovie";
import dbApi, { category, movieType, tvType } from "../api/dbApi";
import { ButtonOuline } from "./Button";
import SearchMovie from "./SearchMovie";
const AllMovie = (props) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotolPage] = useState(0);
  const { keyword } = useParams();
  console.log(keyword);
  useEffect(() => {
    let resp = null;
    const getMovies = async () => {
      try {
        if (keyword === undefined) {
          const params = {};
          switch (props.category) {
            case category.movie:
              resp = await dbApi.getMoviesList(movieType.popular, { params });

              break;
            default:
              resp = await dbApi.getTvList(tvType.on_the_air, { params });
          }
        } else {
          const params = {
            query: keyword,
          };
          resp = await dbApi.search(props.category, { params });
          console.log(resp.data.results);
        }
        setMovies(resp.data.results);
        setTotolPage(resp.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let resp;
    try {
      if (keyword === undefined) {
        const params = { page: page + 1 };
        switch (props.category) {
          case category.movie:
            resp = await dbApi.getMoviesList(movieType.popular, { params });
            console.log("say haloo");
            break;
          default:
            resp = await dbApi.getTvList(tvType.on_the_air, { params });
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword,
        };
        resp = await dbApi.search(props.category, { params });
        console.log(resp.data.results);
      }
      setMovies([...movies, ...resp.data.results]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SearchMovie category={props.category} />
      <div className="grid grid-cols-allMovie gap-x-[10px] md:gap-x-[20px] gap-y-[3rem] md:grid-cols-allMovieTablet lg:grid-cols-allMoviePc ">
        {movies.map((movie, index) => (
          <CardMovie key={index} movie={movie} category={props.category} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-xl text-center md:text-2xl lg:text-4xl">
          No Results!!!
        </div>
      )}
      {page < totalPage ? (
        <div className="text-center mt-[1rem]">
          <ButtonOuline
            onClick={loadMore}
            className="border border-primary rounded-3xl text-xl px-[1.5rem] py-[0.5rem]"
          >
            Load more
          </ButtonOuline>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AllMovie;
