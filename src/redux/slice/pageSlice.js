import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    width: null,
  },
  reducers: {
    setWidth: (state, action) => {
      const { width } = action.payload;
      state.width = width;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWidth } = pageSlice.actions;
export const selectWidth = (state) => state.page.width;
export default pageSlice.reducer;
