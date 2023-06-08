import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "../features/repositories/repoSlice";

export const store = configureStore({
  reducer: {
    repos: repoReducer,
  },
});
