const GOOGLE_API_KEY = "AIzaSyDmP8sKGRSe8kPB7XVQ3CuGM0Oob2ytwrA";

export const LIVE_CHAT_COUNT = 50;

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_RESULT_API =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=";

export const YOUTUBE_SEARCH_RESULT_API_SECOND =
  "&type=video&key=" + GOOGLE_API_KEY;
