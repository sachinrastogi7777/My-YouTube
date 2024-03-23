import moment from "moment";
import React from "react";
import { timeDiff } from "../utils/helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResultCard = ({ cardInfo }) => {
  const { id, snippet } = cardInfo;
  const { videoId } = id;
  const { channelTitle, thumbnails, title, publishedAt, description } = snippet;

  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);

  return (
    <div className={`m-5 ${isSidebarOpen ? "md:m-5" : "md-m-12"}`}>
      <Link
        to={"/watch?v=" + videoId}
        className="cursor-pointer flex flex-col md:flex-row justify-center items-center md:justify-normal md:items-start xl:justify-center"
      >
        <div
          id="video-thumbnail-container"
          className="md:w-52 md:h-36 lg:h-44 overflow-hidden"
        >
          <img
            className="rounded-lg hover:rounded-none"
            alt="thumbnail"
            src={thumbnails.medium.url}
          />
        </div>
        <div
          className={`flex flex-col px-1 md:px-0 md:ml-4 max-w-80 ${
            isSidebarOpen ? "md:w-80" : "md:w-[400px]"
          } lg:w-full lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl`}
        >
          <h2 className="font-bold text-base">{title}</h2>
          <p className="text-xs text-gray-500">{diff}</p>
          <h3 className="my-2 text-sm font-semibold text-gray-500">
            {channelTitle}
          </h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchResultCard;
