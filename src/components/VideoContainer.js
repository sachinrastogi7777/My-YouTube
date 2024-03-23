import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../redux/appSlice";
import Shimmer from "../Layout/Shimmer";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  const style = {
    display: window.innerWidth < 640 && isSidebarOpen ? "none" : "flex",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getVideos();
    if (window.innerWidth < 840) {
      dispatch(closeMenu());
    }
  }, []);

  const getVideos = async () => {
    const videosData = await fetch(
      YOUTUBE_VIDEOS_API + process.env.REACT_APP_GOOGLE_API_KEY
    );
    const jsonData = await videosData.json();
    setVideos(jsonData.items);
  };

  return videos.length === 0 ? (
    <Shimmer />
  ) : (
    <div
      className="col-span-11 p-6 flex flex-wrap gap-x-5 justify-evenly"
      style={style}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} videoInfo={video} />
      ))}
    </div>
  );
};

export default VideoContainer;
