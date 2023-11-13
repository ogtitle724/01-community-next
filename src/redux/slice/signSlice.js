import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: {
    isLogIn: false,
    loginDeadline: null,
    user: null,
    chatAlarm: 0,
  },
  reducers: {
    login: (state) => {
      state.isLogIn = true;
    },
    logout: (state) => {
      state.isLogIn = false;
    },
    setChatAlarm: (state, action) => {
      const { num } = action.payload;
      state.chatAlarm = num;
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
export const { login, logout, setUser, setLoginDeadline, setChatAlarm } =
  signSlice.actions;

export const selectIsLogIn = (state) => state.sign.isLogIn;
export const selectUser = (state) => state.sign.user;
export const selectLoginDeadline = (state) => state.sign.loginDeadline;
export const selectChatAlarm = (state) => state.sign.chatAlarm;

export default signSlice.reducer;
