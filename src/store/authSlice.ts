import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: any;
  isLoggedIn: boolean;
  authChecked: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.authChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.authChecked = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
