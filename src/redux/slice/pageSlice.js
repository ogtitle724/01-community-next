import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    homePageIdx: 1,
    category: "홈",
    scrollY: 0,
    width: null,
    marker: { width: null, left: null },
  },
  reducers: {
    setPage: (state, action) => {
      const { nextPage } = action.payload;
      state.homePageIdx = nextPage;
    },
    setCategory: (state, action) => {
      const { category } = action.payload;
      state.category = category;
    },
    setScrollY: (state, action) => {
      const { scrollY } = action.payload;
      state.scrollY = scrollY;
    },
    setWidth: (state, action) => {
      const { width } = action.payload;
      state.width = width;
    },
    setMarkerWidth: (state, action) => {
      const { width } = action.payload;
      state.marker.width = width;
    },
    setMarkerLeft: (state, action) => {
      const { left } = action.payload;
      state.marker.left = left;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPage,
  setSearchPage,
  setCategory,
  setScrollY,
  setWidth,
  setMarkerLeft,
  setMarkerWidth,
} = pageSlice.actions;

export const selectPage = (state) => state.page.homePageIdx;
export const selectCategory = (state) => state.page.category;
export const selectScrollY = (state) => state.page.scrollY;
export const selectWidth = (state) => state.page.width;
export const selectMarker = (state) => state.page.marker;

export default pageSlice.reducer;
