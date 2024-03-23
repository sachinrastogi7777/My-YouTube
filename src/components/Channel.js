import { useEffect, useState } from "react";
import { YOUTUBE_CHANNEL_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addChannel, removeChannel } from "../redux/subscribeSlice";
import { countViews } from "../utils/helper";

const Channel = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribedChannels = useSelector(
    (store) => store.subscribe.subscribedChannels
  );

  const { id, snippet, statistics } = channelDetails || {};

  const { title, thumbnails } = snippet || {};
  const { subscriberCount } = statistics || {};

  const dispatch = useDispatch();

  useEffect(() => {
    getChannelDetails();
  }, []);

  useEffect(() => {
    const isChannelExistsInSubs = subscribedChannels.some(
      (channel) => channel.id === id
    );
    setIsSubscribed(isChannelExistsInSubs);
  }, [subscribedChannels, id]);

  useEffect(() => {
    if (isSubscribed && channelDetails) {
      dispatch(addChannel(channelDetails));
    } else if (!isSubscribed && id) {
      dispatch(removeChannel(id));
    }
  }, [isSubscribed]);

  const getChannelDetails = async () => {
    const data = await fetch(
      YOUTUBE_CHANNEL_API +
        channelId +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    setChannelDetails(json.items[0]);
  };

  return (
    <div className="flex items-center">
      <div>
        <img
          src={thumbnails?.default?.url}
          alt="channel-logo"
          className="h-10 w-10 rounded-full mr-2 md:mr-3"
        />
      </div>
      <div className="mr-6">
        <h3 className="font-bold text-sm md:text-base">{title}</h3>
        <p className="text-xs font-semibold text-gray-500">
          {countViews(subscriberCount || "")} subscribers
        </p>
      </div>
      <div onClick={() => setIsSubscribed(!isSubscribed)}>
        {!isSubscribed ? (
          <button className="bg-red-600 rounded-full px-3 py-2 text-sm md:text-base text-white hover:bg-gray-200 hover:text-black">
            Subscribe
          </button>
        ) : (
          <button className="bg-gray-200 rounded-full px-3 py-2">
            Subscribed
          </button>
        )}
      </div>
    </div>
  );
};

export default Channel;
