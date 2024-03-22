import React from "react";

const LiveChatIcon = ({ firstLetter }) => {
  return (
    <div className="h-6 w-6 bg-red-600 text-white text-center leading-6 rounded-full">
      {firstLetter}
    </div>
  );
};

export default LiveChatIcon;
