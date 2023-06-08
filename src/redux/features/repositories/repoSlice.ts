import { createSlice } from "@reduxjs/toolkit";
import { repositoryType } from "../../../types";

interface Repos {
  allRepos: repositoryType[];
}

const initialState: Repos = {
  allRepos: [],
};

export const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    allRepos: (state, action) => {
      state.allRepos.push(action.payload);
    },
  },
});

export const { allRepos } = repoSlice.actions;

export const selectRepos = (state: any) => state.repos.allRepos;

export default repoSlice.reducer;
