import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/appSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../utils/constant";
import { cacheResult } from "../redux/searchSlice";
import { Link } from "react-router-dom";

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
    <nav className="flex items-center justify-between px-4 md:px-7 py-4">
      <div className="flex items-center">
        <RxHamburgerMenu
          className="h-5 w-5 md:h-6 md:w-6"
          onClick={toggleMenuHandler}
        />
        <Link to="/" className="flex items-center">
          <img
            alt="logo"
            src="/Assets/youtube-icon.png"
            className="h-5 w-7 md:h-7 md:w-7 ml-3 md:ml-6 mr-1"
          />
          <h1 className="font-bold text-lg md:text-2xl">YouTube</h1>
        </Link>
      </div>
      <div className="relative focus-within:absolute focus-within:w-[93%] md:focus-within:relative md:focus-within:w-auto">
        <div className="flex items-center">
          <input
            className="border border-solid border-gray-300 px-3 py-2 h-7 md:h-10 w-32 focus:w-full md:w-[575px] md:focus:w-[575px] rounded-l-full text-xs md:text-sm focus:outline-blue-100"
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
          <a href={"/results?search_query=" + searchQuery.split(" ").join("+")}>
            <button
              className="border border-gray-300 px-2 md:px-5 h-7 md:h-10 z-10 bg-gray-200 hover:bg-gray-400 rounded-r-full"
              aria-label="search"
            >
              <IoSearch />
            </button>
          </a>
        </div>
        {showSuggestions && searchResult.length > 0 && (
          <div className="py-2 mx-1 absolute w-[91%] bg-white z-10 border border-solid border-gray-300 rounded-lg">
            <ul>
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
                    <div className="h-8 py-2">
                      <IoSearch />
                    </div>
                    <li className="py-1 ml-4">{search}</li>
                  </div>
                </a>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative">
        <FaUserCircle id="profile-icon" className="text-2xl md:text-3xl" />
      </div>
    </nav>
  );
};

export default NavBar;
