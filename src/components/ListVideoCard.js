import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import useTextDecode from "../utils/useTextDecodes";
import { LuDot } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { removeFromLikedVideos } from "../redux/likedVideosSlice";
import { removeFromWatchLater } from "../redux/watchLaterSlice";
import { calculateDuration, countViews, timeDiff } from "../utils/helper";

const ListVideoCard = ({ videoInfo }) => {
  const { id, snippet, statistics, contentDetails } = videoInfo;

  const { title, channelTitle, thumbnails, publishedAt } = snippet;
  const { viewCount } = statistics;
  const { duration } = contentDetails;

  const videoDuration = calculateDuration(duration);
  let date1 = moment(publishedAt).utc().format("YYYY-MM-DD HH:mm:ss");
  let date2 = moment();
  const diff = timeDiff(date1, date2);
  const videoTitle = useTextDecode(title);

  const dispatch = useDispatch();

  const location = useLocation();

  const handleRemoveButtonClick = () => {
    if (location.pathname === "/liked") {
      dispatch(removeFromLikedVideos(id));
    } else if (location.pathname === "/watchlater") {
      dispatch(removeFromWatchLater(id));
    }
  };

  return (
    <div className="my-4">
      <Link
        to={"/watch?v=" + id}
        id="list-video-card"
        className="p-2 flex cursor-pointer hover:bg-gray-100 rounded-lg"
      >
        <div className="relative flex-none w-40 h-[90px]">
          <img
            src={thumbnails.medium.url}
            alt="video-thumb"
            className="rounded-lg"
          />
          <p className="absolute bottom-1 right-1 text-xs text-white font-semibold bg-black py-1 px-[5px] rounded-md">
            {videoDuration}
          </p>
        </div>
        <div className="px-[6px] md:px-2 flex-grow">
          <h2 className="font-bold text-sm lg:text-base">{videoTitle}</h2>
          <h3 className="text-xs md:text-sm font-semibold text-gray-500">
            {channelTitle}
          </h3>
          <p className="text-xs text-gray-500 hidden md:flex items-center">
            {countViews(viewCount)} views
            <span className="text-xl mt-0.5">
              <LuDot />
            </span>
            {diff}
          </p>
        </div>
        <div onClick={(e) => e.preventDefault()} id="list-video-card-close-btn">
          <p className="text-xs md:text-base">
            <IoClose onClick={() => handleRemoveButtonClick()} />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ListVideoCard;
