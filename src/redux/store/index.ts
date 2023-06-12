import { configureStore, Store } from "@reduxjs/toolkit";
import repoReducer from "../features/repositories/repoSlice";

export const store: Store = configureStore({
  reducer: {
    repos: repoReducer,
  },
});
