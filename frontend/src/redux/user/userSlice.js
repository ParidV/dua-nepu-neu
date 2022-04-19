import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    initialState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    update_data: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { login, logout, initialState, update_data } = userSlice.actions;
export default userSlice.reducer;
