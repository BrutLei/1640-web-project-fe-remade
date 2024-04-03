import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, userReducer } from "./slices";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
