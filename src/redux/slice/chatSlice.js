import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    socket: null,
  },
  reducers: {
    connect: (state, action) => {
      const { socket } = action.payload;
      state.socket = socket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect } = chatSlice.actions;
export const selectSocket = (state) => state.chat.socket;

export default chatSlice.reducer;
