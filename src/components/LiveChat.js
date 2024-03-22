import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/chatSlice";
import { generateRandomMesage, generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const ChatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const timer = setInterval(() => {
      // API Polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMesage(),
        })
      );
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="border border-slate-200 h-[45px] w-[400px] rounded-t-xl">
        <p className="m-3 px-2">Live Chat</p>
      </div>
      <div className="border border-slate-200 h-[390px] w-[400px] overflow-y-scroll flex flex-col-reverse">
        {ChatMessages.map((chat, index) => (
          <ChatMessage key={index} name={chat.name} message={chat.message} />
        ))}
      </div>
      <div className="border border-slate-200 h-[56px] w-[400px] rounded-b-xl">
        <form
          className="mt-2 ml-6"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addMessage({
                name: "Sachin Rastogi",
                message: liveMessage,
              })
            );
            setLiveMessage("");
          }}
        >
          <input
            className="border border-none bg-gray-100 rounded-l-full rounded-r-full w-80 h-10 px-4 placeholder:font-light focus:outline-none"
            type="text"
            placeholder="Chat..."
            value={liveMessage}
            onChange={(e) => {
              setLiveMessage(e.target.value);
            }}
          />
          <button
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                addMessage({
                  name: "Sachin Rastogi",
                  message: liveMessage,
                })
              );
              setLiveMessage("");
            }}
          >
            🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
