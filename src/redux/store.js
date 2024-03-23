import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import subscribeSlice from "./subscribeSlice";
import watchLaterSlice from "./watchLaterSlice";
import likedVideosSlice from "./likedVideosSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
    subscribe: subscribeSlice,
    watchLater: watchLaterSlice,
    likedVideos: likedVideosSlice,
  },
});

export default store;
