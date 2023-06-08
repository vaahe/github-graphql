import { FC } from "react";
import { SearchInput } from "../components/SearchInput";
// import { Pagination } from "../components/Pagination";
import { RepositoryList } from "../components/RepositoryList";

export const Home: FC = () => {
  return (
    <div>
      <SearchInput />
      <RepositoryList />
    </div>
  );
};
