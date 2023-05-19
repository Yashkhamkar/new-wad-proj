import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  price: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload.others;
      state.token = actions.payload.token;
    },
    register: (state, actions) => {
      state.user = actions.payload.others;
      state.token = actions.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { login, register, logout } =
  authSlice.actions;
export default authSlice.reducer;
