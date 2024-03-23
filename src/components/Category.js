import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  YOUTUBE_ALL_VIDEO_CATEGORY_API,
  YOUTUBE_CATEGORY_VIDEO_API,
} from "../utils/constant";
import SearchResultCard from "./SearchResultCard";

const Category = () => {
  const [videoCategoriesList, setVideoCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryVideos, setCategoryVideos] = useState([]);

  const { category } = useParams();
  console.log(category);

  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  const style = {
    display: window.innerWidth < 640 && isSidebarOpen ? "none" : "block",
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getCategoryId();
  }, [category, videoCategoriesList]);

  useEffect(() => {
    if (categoryId) {
      getVideosFromCategory();
    }
  }, [categoryId]);

  const getAllCategories = async () => {
    const data = await fetch(
      YOUTUBE_ALL_VIDEO_CATEGORY_API + process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    setVideoCategoriesList(json.items);
  };

  const getCategoryId = () => {
    videoCategoriesList.map((categoryItem) => {
      if (categoryItem.snippet.title.toLowerCase().includes(category)) {
        setCategoryId(categoryItem.id);
      }
    });
  };

  const getVideosFromCategory = async () => {
    const data = await fetch(
      YOUTUBE_CATEGORY_VIDEO_API +
        categoryId +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    setCategoryVideos(json.items);
  };

  return (
    <div className="col-span-11" style={style}>
      {categoryVideos &&
        categoryVideos.map((video) => (
          <SearchResultCard key={video.id.videoId} cardInfo={video} />
        ))}
    </div>
  );
};

export default Category;
