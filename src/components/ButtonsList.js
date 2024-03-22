import React from "react";
import Button from "./Button";

const buttonList = [
  "All",
  "Coding",
  "Cricket",
  "Games",
  "Laptop",
  "Live",
  "Movies",
  "Music",
  "News",
  "Songs",
  "Stocks",
];

const ButtonsList = () => {
  return (
    <div className="flex">
      {buttonList.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonsList;
