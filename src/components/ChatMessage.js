import React from "react";
import LiveChatIcon from "./LiveChatIcon";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="hover:bg-gray-100">
      <div className="flex mx-3 my-2 px-2">
        <LiveChatIcon firstLetter={name[0]} />
        <div className="w-full pl-4">
          <span className="text-sm text-slate-400">
            {name}
            <span className="px-2 text-xs text-black">{message}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
