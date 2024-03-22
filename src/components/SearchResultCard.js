import moment from "moment";
import React from "react";
import { timeDiff } from "../utils/helper";

const SearchResultCard = ({ cardInfo }) => {
  const { snippet } = cardInfo;
  const { channelTitle, thumbnails, title, publishedAt, description } = snippet;

  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);

  return (
    <div>
      <div className="flex py-4">
        <div className="w-[360px]">
          <img
            className=" rounded-lg"
            alt="thumbnail"
            src={thumbnails.medium.url}
          />
        </div>
        <div className="mx-4 absolute left-[45%]">
          <p className="text-lg">{title}</p>
          <p className="text-xs text-gray-600">{diff}</p>
          <p className="py-4 text-sm text-gray-600">{channelTitle}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
