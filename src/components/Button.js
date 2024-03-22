import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <a href={"/results?search_query=" + name}>
        <button className="px-3 py-1 m-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          {name}
        </button>
      </a>
    </div>
  );
};

export default Button;
