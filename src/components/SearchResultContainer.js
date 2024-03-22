import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  YOUTUBE_SEARCH_RESULT_API,
  YOUTUBE_SEARCH_RESULT_API_SECOND,
} from "../utils/constant";
import ButtonsList from "./ButtonsList";
import SearchResultCard from "./SearchResultCard";

const SearchResultContainer = () => {
  const [searchParams] = useSearchParams();
  const [searchResultResponse, setSearchResultResponse] = useState([]);

  useEffect(() => {
    handleSearchResult();
  }, []);

  const handleSearchResult = async () => {
    const searchResult = await fetch(
      YOUTUBE_SEARCH_RESULT_API +
        searchParams.get("search_query").split(" ").join("%20") +
        YOUTUBE_SEARCH_RESULT_API_SECOND
    );
    const jsonResponse = await searchResult.json();
    setSearchResultResponse(jsonResponse.items);
  };

  return (
    <div className="-ml-10">
      <ButtonsList />
      {searchResultResponse &&
        searchResultResponse.map((searchResult) => (
          <Link
            to={"/watch?v=" + searchResult.id.videoId}
            key={searchResult.id.videoId}
          >
            <SearchResultCard cardInfo={searchResult} />
          </Link>
        ))}
    </div>
  );
};

export default SearchResultContainer;
