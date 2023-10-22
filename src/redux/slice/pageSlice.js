import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    category: "홈",
    group: null,
    width: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setGroup(state, action) {
      state.group = action.payload;
    },
    setWidth(state, action) {
      state.width = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWidth, setCategory, setGroup } = pageSlice.actions;
export const selectWidth = (state) => state.page.width;
export const selectCategory = (state) => state.page.category;
export const selectGroup = (state) => state.page.group;
export default pageSlice.reducer;
