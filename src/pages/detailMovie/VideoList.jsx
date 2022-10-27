import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";

import dbApi from "../../api/dbApi";

const VideoList = (props) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await dbApi.getVideos(category, props.id);
      setVideos(res.data.results.slice(0, 2));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = (props) => {
  const item = props.item;

  return (
    <div className="mb-[2rem]">
      <div>
        <h2 className="text-2xl mb-[0.6rem] md:text-4xl">{item.name}</h2>
      </div>
      <div className="h-0 pb-[56%] relative">
        <iframe
          src={`https://www.youtube.com/embed/${item.key}`}
          width="100%"
          title="video"
          className="absolute top-0 left-0 bottom-0 !h-full !w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoList;
