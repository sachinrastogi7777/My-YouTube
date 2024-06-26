import { useSelector } from "react-redux";
import ChannelCard from "./ChannelCard";

const Subscriptions = () => {
  const subscribedChannels = useSelector(
    (store) => store.subscribe.subscribedChannels
  );

  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  const style = {
    display: window.innerWidth < 640 && isSidebarOpen ? "none" : "block",
  };

  return (
    <div className="col-span-11 px-8 py-5" style={style}>
      <h1 className="font-bold text-2xl">Your Subscriptions</h1>
      {subscribedChannels.length > 0 ? (
        <div className="flex flex-col md:flex-row flex-wrap">
          {subscribedChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="my-10">
          <p>
            You don't have any channels subscribed. Subscribe to some channels
            to see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
