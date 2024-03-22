import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/appSlice";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../utils/constant";
import { cacheResult } from "../redux/searchSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, seatSearchResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        seatSearchResult(searchCache[searchQuery]);
      } else {
        fetchSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const fetchSearchSuggestion = async () => {
    const searchData = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery);
    const jsonData = await searchData.json();
    seatSearchResult(jsonData[1]);
    dispatch(
      cacheResult({
        [searchQuery]: jsonData[1],
      })
    );
  };

  return (
    <div>
      <div className="flex flex-row items-center px-4 h-14">
        <div className="flex flex-row items-center h-14 w-[169px]">
          <img
            className="h-10 w-10 p-2 cursor-pointer"
            alt="hamburger-icon"
            src="/Assets/hamburger-icon.png"
            onClick={() => toggleMenuHandler()}
          />
          <a href="/">
            <img
              className="h-14 w-[120px] pr-[14px] pl-4 py-[18px] cursor-pointer"
              alt="youtube-icon"
              src="/Assets/youtube-logo.png"
            />
          </a>
        </div>
        <div className="flex flex-row basis-[732px] items-center content-center h-10 mx-[90px]">
          <div className="flex flex-1 ml-10 px-1 h-10 items-center">
            <input
              className="w-[575px] h-10 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-blue-100"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onFocus={() => {
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setShowSuggestions(false);
              }}
            />
            <a
              href={"/results?search_query=" + searchQuery.split(" ").join("+")}
            >
              <img
                className="h-10 px-5 py-2 border border-gray-300 rounded-r-full cursor-pointer bg-opacity-10 bg-gray-300"
                alt="search-icon"
                src="/Assets/search-icon.png"
              />
            </a>
          </div>
        </div>
        <div className="ml-24">
          <img
            className="h-6 rounded-full"
            alt="user-icon"
            src="/Assets/user-icon.png"
          />
        </div>
      </div>
      {showSuggestions && (
        <div className="absolute left-[48%] transform -translate-x-1/2 w-[575px]">
          <ul className="border border-gray-200 bg-white text-left rounded-lg">
            {searchResult.map((search, index) => (
              <a
                key={index}
                href={"/results?search_query=" + search.split(" ").join("+")}
              >
                <div
                  className="flex px-4 my-2 hover:bg-opacity-5 hover:bg-gray-600"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img
                    className="h-8 py-2"
                    alt="search-icon"
                    src="/Assets/search-icon.png"
                  />
                  <li className="py-1 ml-4">{search}</li>
                </div>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
