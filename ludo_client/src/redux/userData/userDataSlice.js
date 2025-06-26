import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  token: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },

    clearUserData: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
