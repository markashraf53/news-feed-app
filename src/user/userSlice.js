import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUserInfo: null,
  isSignedIn: false,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    setUserInformation(state, payload) {
      state.authUserInfo = payload;
    },
    logOut(state) {
      state.isSignedIn = false;
    },
  },
});

export const getAuthUserInfo = (state) => {
  return state.user.authUserInfo?.payload;
};

export const getIsSignedIn = (state) => {
  return state.user.isSignedIn;
};

export const { signIn, logOut, setUserInformation, updateUserAvatar } =
  userSlice.actions;
export default userSlice.reducer;
