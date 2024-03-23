import React from "react";
import moment from "moment";
import { calculateDuration, countViews, timeDiff } from "../utils/helper";
import "moment-precise-range-plugin";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";

const VideoCard = ({ videoInfo }) => {
  const { id, contentDetails, snippet, statistics } = videoInfo;
  const { duration } = contentDetails;
  const { viewCount } = statistics;
  const { channelTitle, thumbnails, title, publishedAt } = snippet;

  const totalViews = countViews(viewCount);

  const videoDuration = calculateDuration(duration);

  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);

  return (
    <div className="w-72 mb-8">
      <Link to={"/watch?v=" + id} className="cursor-pointer">
        <div
          id="video-thumbnail-container"
          className="relative overflow-hidden"
        >
          <img
            className="rounded-lg hover:rounded-none"
            alt="thumbnail"
            src={thumbnails.medium.url}
          />
          <p className="absolute bottom-1 right-1 text-xs text-white font-semibold bg-black py-1 px-[5px] rounded-md">
            {videoDuration}
          </p>
        </div>
        <div className="px-[6px]">
          <h2 className="font-bold text-base mt-[6px]">{title}</h2>
          <h3 className="text-sm mb-[2px] font-semibold text-gray-500">
            {channelTitle}
          </h3>
          <p className="flex text-sm text-gray-500 items-center">
            {totalViews} views
            <span className="text-xl mt-0.5">
              <LuDot />
            </span>
            {diff}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
