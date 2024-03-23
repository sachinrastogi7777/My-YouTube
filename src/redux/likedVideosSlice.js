import { createSlice } from "@reduxjs/toolkit";

const likedVideos = [];

const likedVideosSlice = createSlice({
  name: "likedVideos",
  initialState: {
    likedVideos: likedVideos,
  },
  reducers: {
    addToLikedVideos: (state, action) => {
      const exists = state.likedVideos.some(
        (video) => video.id === action.payload.id
      );
      if (!exists) {
        state.likedVideos.push(action.payload);
      }
    },
    removeFromLikedVideos: (state, action) => {
      state.likedVideos = state.likedVideos.filter(
        (video) => video.id !== action.payload
      );
    },
  },
});

export const { addToLikedVideos, removeFromLikedVideos } =
  likedVideosSlice.actions;

export default likedVideosSlice.reducer;
