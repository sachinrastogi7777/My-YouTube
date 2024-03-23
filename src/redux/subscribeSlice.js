import { createSlice } from "@reduxjs/toolkit";

const subscribedChannels = [];

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    subscribedChannels: subscribedChannels,
  },
  reducers: {
    addChannel: (state, action) => {
      const exists = state.subscribedChannels.some(
        (channel) => channel.id === action.payload.id
      );
      if (!exists) {
        state.subscribedChannels.push(action.payload);
      }
    },
    removeChannel: (state, action) => {
      state.subscribedChannels = state.subscribedChannels.filter(
        (channel) => channel.id !== action.payload
      );
    },
  },
});

export const { addChannel, removeChannel } = subscribeSlice.actions;

export default subscribeSlice.reducer;
