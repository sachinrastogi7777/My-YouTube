import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const videosData = await fetch(YOUTUBE_VIDEOS_API);
    const jsonData = await videosData.json();
    setVideos(jsonData.items);
  };
  return videos.length !== 0 ? (
    <div className="flex flex-wrap cursor-pointer">
      {videos.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <VideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  ) : (
    ""
  );
};

export default VideoContainer;
