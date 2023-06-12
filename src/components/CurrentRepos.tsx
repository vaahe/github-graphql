import {useEffect, useMemo, useState, FC, ReactNode} from "react";
import {Repository} from "./Repository";
import styles from "../styles/RepositoryList.module.css";
import {Loading} from "./Loading";
import {Pagination} from "./Pagination";
import {repositoryType} from "../types";

interface CurrentReposProps {
    repositories: repositoryType;
}

export const CurrentRepos: FC<CurrentReposProps> = (props) => {
    const page = parseInt(window?.localStorage?.getItem("currentPage"), 10);

    const query = useMemo(() => {
        return window?.localStorage?.getItem("query");
    }, []);

    const [currentPage, setCurrentPage] = useState<number>(page || 1);
    const pageSize = 10;

    const {data, fetchMore} = props.repositories;

    const repositories = data?.user?.repositories?.nodes;
    const pageInfo = data?.user?.repositories?.pageInfo;
    const totalCount = data?.user?.repositories?.totalCount;

    const handleLoadMore = () => {
        if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    pageSize,
                    cursor: pageInfo?.endCursor,
                },
                updateQuery: (prevResult: ReactNode | repositoryType, {fetchMoreResult}: any) => {
                    if (!fetchMoreResult) return prevResult;
                    return {
                        user: {
                            ...prevResult.user,
                            repositories: {
                                ...prevResult.user.repositories,
                                pageInfo: fetchMoreResult.user.repositories.pageInfo,
                                nodes: [
                                    ...prevResult.user.repositories.nodes,
                                    ...fetchMoreResult.user.repositories.nodes,
                                ],
                            },
                        },
                    };
                },
            });
        }
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return repositories?.length && repositories?.slice(firstPageIndex, lastPageIndex);
    }, [repositories, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        window?.localStorage?.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    return (
        <div className={styles.container}>
            {currentTableData?.length ?
                <>
                    {currentTableData.map((repository: ReactNode | repositoryType, index: number) => (
                        <Repository
                            key={`${repository?.name}_${index}`}
                            name={repository?.name}
                            stargazerCount={repository?.stargazerCount}
                            updatedAt={repository?.updatedAt}
                            url={repository?.url}
                        />))
                    }
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={(page: number) => {
                            handleLoadMore();
                            setCurrentPage(page);
                        }}
                    />
                </>
                :
                <Loading/>
            }
        </div>
    );
};
