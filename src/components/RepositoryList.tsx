import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Repository } from "./Repository";
import { Pagination } from "./Pagination";
import { repositoryType } from "../types";
import { GET_USER_REPOSITORIES } from "../graphql/queries";

import styles from "../styles/RepositoryList.module.css";
import { useDispatch } from "react-redux";
import {
  allRepos,
  selectRepos,
} from "../redux/features/repositories/repoSlice";
import { useSelector } from "react-redux";

export const RepositoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const username = "vaahe";
  const dispatch = useDispatch();
  const selector = useSelector(selectRepos);

  const { data, fetchMore } = useQuery(GET_USER_REPOSITORIES, {
    variables: {
      username,
      pageSize,
      cursor: null,
    },
  });

  const repositories = data?.user?.repositories?.nodes;
  const pageInfo = data?.user?.repositories?.pageInfo;
  // dispatch(allRepos(repositories));

  // const handleLoadMore = useCallback(() => {
  //   fetchMore({
  //     variables: { username: "vaahe", cursor: pageInfo?.endCursor },
  //     updateQuery: (prevResult, { fetchMoreResult }) => {
  //       const newRepositories = fetchMoreResult?.user?.repositories;

  //       return {
  //         user: {
  //           ...prevResult.user,
  //           repositories: {
  //             ...newRepositories,
  //             nodes: [
  //               ...prevResult.user.repositories.nodes,
  //               ...newRepositories.nodes,
  //             ],
  //           },
  //         },
  //       };
  //     },
  //   });
  // }, [fetchMore, pageInfo?.endCursor]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    console.log(firstPageIndex, lastPageIndex);
    return repositories?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, repositories]);

  useEffect(() => {
    console.log(selector);
  }, []);

  return (
    <div className={styles.container}>
      {currentTableData?.length &&
        currentTableData?.map((repository: repositoryType) => (
          <Repository
            key={repository.name}
            name={repository.name}
            stargazerCount={repository.stargazerCount}
            updatedAt={repository.updatedAt}
            url={repository.url}
          />
        ))}

      <Pagination
        currentPage={currentPage}
        totalCount={29}
        pageSize={pageSize}
        onPageChange={(page: number) => {
          handleLoadMore();
          setCurrentPage(page);
        }}
      />
    </div>
  );
};
