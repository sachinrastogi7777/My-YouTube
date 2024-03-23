import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULT_API } from "../utils/constant";
import SearchResultCard from "./SearchResultCard";
import { useSelector } from "react-redux";

const SearchResultContainer = () => {
  const [searchParams] = useSearchParams();
  const [searchResultResponse, setSearchResultResponse] = useState([]);
  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  const style = {
    display: window.innerWidth < 640 && isSidebarOpen ? "none" : "block",
  };

  useEffect(() => {
    handleSearchResult();
  }, []);

  const handleSearchResult = async () => {
    const searchResult = await fetch(
      YOUTUBE_SEARCH_RESULT_API +
        searchParams.get("search_query").split(" ").join("%20") +
        "&type=video&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const jsonResponse = await searchResult.json();
    setSearchResultResponse(jsonResponse.items);
  };

  return (
    <div className="col-span-11" style={style}>
      {searchResultResponse.map((searchResult) => (
        <SearchResultCard
          key={searchResult.id.videoId}
          cardInfo={searchResult}
        />
      ))}
    </div>
  );
};

export default SearchResultContainer;
