import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../redux/appSlice";
import {
  addToLikedVideos,
  removeFromLikedVideos,
} from "../redux/likedVideosSlice";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../redux/watchLaterSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { YOUTUBE_VIDEO_STATS_API } from "../utils/constant";
import useTextDecode from "../utils/useTextDecodes";
import Channel from "./Channel";
import { GrView } from "react-icons/gr";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { countViews, timeDiff } from "../utils/helper";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState();
  const [showDescription, setShowDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { id, snippet, statistics } = videoDetails || {};

  const { title, channelId, description, publishedAt } = snippet || {};
  const { viewCount, likeCount } = statistics || {};

  const videoId = searchParams.get("v");

  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);

  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);
  const watchLaterVideos = useSelector(
    (store) => store.watchLater.watchLaterVideos
  );
  const likedVideos = useSelector((store) => store.likedVideos.likedVideos);

  const videoTitle = useTextDecode(title);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    getVideoStats();
  }, []);

  // Check if video is in likedVideosList on initial render and subsequent renders
  useEffect(() => {
    const isVideoInLiked = likedVideos.some((video) => video.id === id);
    setIsLiked(isVideoInLiked);
  }, [likedVideos, id]);

  // Update likedVideosList on like button click
  useEffect(() => {
    if (isLiked && videoDetails) {
      dispatch(addToLikedVideos(videoDetails));
    } else if (!isLiked && id) {
      dispatch(removeFromLikedVideos(id));
    }
  }, [isLiked]);

  // Check if video is in watchLaterVideos on initial render and subsequent renders
  useEffect(() => {
    const isVideoInWL = watchLaterVideos.some((video) => video.id === id);
    setIsSaved(isVideoInWL);
  }, [watchLaterVideos, id]);

  // Update watchLaterVideos on save button click
  useEffect(() => {
    if (isSaved && videoDetails) {
      dispatch(addToWatchLater(videoDetails));
    } else if (!isSaved && id) {
      dispatch(removeFromWatchLater(id));
    }
  }, [isSaved]);

  const getVideoStats = async () => {
    const stats = await fetch(
      YOUTUBE_VIDEO_STATS_API +
        videoId +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const jsonData = await stats.json();
    setVideoDetails(jsonData.items[0]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="my-3">
        <div className="mx-16">
          <iframe
            className="rounded-xl sm:w-96 md:w-[676px] h-[200px] sm:h-80 md:h-96"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full md:w-[810px]">
          <div className="my-3 mx-16">
            <h2 className="font-bold text-xl">{videoTitle}</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center my-3">
              {channelId && <Channel channelId={channelId} />}
              <div className="flex mt-3 md:mt-0 md:ml-auto">
                <p className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                  <GrView className="mr-2 text-xl" />
                  {countViews(viewCount || "")}
                </p>
                <p
                  className={`ml-5 flex items-center px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer ${
                    isLiked ? "bg-gray-200" : "bg-gray-100"
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? (
                    <BiSolidLike className="mr-2 text-xl" />
                  ) : (
                    <BiLike className="mr-2 text-xl" />
                  )}
                  {countViews(likeCount || "")}
                </p>
                <p
                  className={`ml-5 flex items-center px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer ${
                    isSaved ? "bg-gray-200" : "bg-gray-100"
                  }`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  {isSaved ? (
                    <>
                      <MdPlaylistAddCheck className="mr-2 text-xl" /> Saved
                    </>
                  ) : (
                    <>
                      <MdPlaylistAdd className="mr-2 text-xl" /> Save
                    </>
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold">{diff}</p>
            <div
              className="bg-gray-100 p-4 rounded-lg mt-2 cursor-pointer"
              onClick={() => setShowDescription(!showDescription)}
            >
              <p
                className={`text-sm md:text-base ${
                  showDescription
                    ? "w-[278px] sm:w-[540px] md:w-[650px] overflow-auto whitespace-break-spaces"
                    : "w-[278px] sm:w-[540px] md:w-[650px] whitespace-nowrap overflow-hidden text-ellipsis"
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[810px]">
          <CommentsContainer />
        </div>
      </div>
      <div className="my-3">
        <LiveChat />
      </div>
    </div>
  );
};

export default WatchPage;
