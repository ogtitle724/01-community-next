import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    isLogIn: false,
    loginDeadline: null,
    isDarkMode: false,
    user: null,
  },
  reducers: {
    login: (state) => {
      state.isLogIn = true;
    },
    logout: (state) => {
      state.isLogIn = false;
    },
    clickModeBtn: (state) => {
      let sign = !state.isDarkMode;
      state.isDarkMode = sign;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setLoginDeadline: (state, action) => {
      const { deadline } = action.payload;
      state.loginDeadline = deadline;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, clickModeBtn, setUser, setLoginDeadline } =
  signSlice.actions;
export const selectIsLogIn = (state) => state.sign.isLogIn;
export const selectIsDarkMode = (state) => state.sign.isDarkMode;
export const selectUser = (state) => state.sign.user;
export const selectLoginDeadline = (state) => state.sign.loginDeadline;

export default signSlice.reducer;
