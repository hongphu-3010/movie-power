import axiosClient from "./axiosCreate";

const category = {
  movie: "movie",
  tv: "tv",
};
const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};
const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  getReviews: (cate, id) => {
    const url = category[cate] + "/" + id + "/reviews";
    return axiosClient.get(url, { params: {} });
  },
  getRecommen: (cate, id) => {
    const url = category[cate] + "/" + id + "/recommendations";
    return axiosClient.get(url, { params: {} });
  },
};
export { category, movieType, tvType };
export default tmdbApi;
