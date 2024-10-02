import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./ui/darkModeSlice";
import userReducer from "./user/userSlice";


const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer,
  },
});

export default store;
