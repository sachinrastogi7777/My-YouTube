import { createSlice } from "@reduxjs/toolkit";

const watchLaterVideos = [];

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    watchLaterVideos: watchLaterVideos,
  },
  reducers: {
    addToWatchLater: (state, action) => {
      const exists = state.watchLaterVideos.some(
        (video) => video.id === action.payload.id
      );
      if (!exists) {
        state.watchLaterVideos.push(action.payload);
      }
    },
    removeFromWatchLater: (state, action) => {
      state.watchLaterVideos = state.watchLaterVideos.filter(
        (video) => video.id !== action.payload
      );
    },
  },
});

export const { addToWatchLater, removeFromWatchLater } =
  watchLaterSlice.actions;

export default watchLaterSlice.reducer;
