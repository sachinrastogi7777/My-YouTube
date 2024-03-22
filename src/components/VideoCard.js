import React from "react";
import moment from "moment";
import { timeDiff } from "../utils/helper";
import "moment-precise-range-plugin";

const VideoCard = ({ videoInfo }) => {
  const { contentDetails, snippet, statistics } = videoInfo;
  const duration = contentDetails.duration;
  const { channelTitle, thumbnails, title, publishedAt } = snippet;

  const totalViews = statistics && Math.trunc(statistics.viewCount / 1000);
  const finalView =
    totalViews >= 1000
      ? (totalViews / 1000).toFixed(1) * 1 + "M"
      : totalViews + "K";

  let num = "";
  let obj = { H: "00", M: "00", S: "00" };
  for (let i = 2; i < duration.length; i++) {
    if (["H", "M", "S"].includes(duration[i])) {
      if (num.length === 1) {
        obj[duration[i]] = "0" + num;
        num = "";
      } else {
        obj[duration[i]] = num;
        num = "";
      }
    } else {
      num += duration[i];
    }
  }

  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);

  return (
    <div className="p-2 m-2 w-80">
      <div className="relative">
        <img
          className="rounded-xl"
          alt="thumbnail"
          src={thumbnails.medium.url}
        />
        <div className="px-1 absolute bottom-1 right-1 font-thin text-white text-sm bg-neutral-800 w-fit rounded-sm">
          {obj.H + ":" + obj.M + ":" + obj.S}
        </div>
      </div>
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <div className="flex">
          <li>{finalView} views • </li>
          <li className="mx-1">{diff}</li>
        </div>
      </ul>
    </div>
  );
};

export default VideoCard;
