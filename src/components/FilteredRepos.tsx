import {useEffect, useMemo, useState, FC, ReactNode} from 'react';
import {Loading} from './Loading';
import styles from "../styles/RepositoryList.module.css";
import {Repository} from './Repository';
import {Pagination} from './Pagination';
import {repositoryType} from "../types";

interface FilteredReposProps {
    repositories: repositoryType;
}

export const FilteredRepos: FC<FilteredReposProps> = (props) => {
    const page = parseInt(window?.localStorage?.getItem("currentPage"));
    const query = window?.localStorage?.getItem("query");

    const [currentPage, setCurrentPage] = useState<number>(page || 1);
    const {data, fetchMore} = props.repositories;

    const repositories = data?.search?.edges?.map((edge: ReactNode) => edge.node);
    const pageInfo = data?.search?.pageInfo;
    const pageSize = 10;
    const totalCount = data?.search?.repositoryCount;
    const author = data?.search?.edges;

    const handleLoadMore = () => {
        if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    // queryString,
                    cursor: pageInfo?.endCursor,
                },
                updateQuery: (prevResult: any, {fetchMoreResult}: any) => {
                    if (!fetchMoreResult) {
                        return prevResult;
                    }

                    return {
                        search: {
                            ...prevResult?.search,
                            edges: [
                                ...prevResult.search.edges,
                                ...fetchMoreResult.search.edges,
                            ],
                            pageInfo: fetchMoreResult?.search?.pageInfo,
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

    useMemo(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        window?.localStorage?.setItem("currentPage", currentPage.toString());
    }, [currentPage])

    return (
        <div className={styles.container}>
            {
                currentTableData?.length ?
                    <>
                        {
                            currentTableData?.map((repository: any, index: number) => (
                                <Repository
                                    key={`${repository?.name}_${index}`}
                                    name={repository?.name}
                                    stargazerCount={repository?.stargazerCount}
                                    updatedAt={repository?.updatedAt}
                                    url={repository?.url}
                                    author={repository?.owner?.login}
                                />
                            ))
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
}
