import { FC } from "react";

import { paginationType } from "../types";
import styles from "../styles/Pagination.module.css";
import { usePagination, DOTS } from "../hooks/usePagination";

export const Pagination: FC<paginationType> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    }: paginationType = props;

    const paginationRange =
        usePagination({
            currentPage,
            totalCount,
            siblingCount,
            pageSize,
        }) || [];

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange?.length - 1];
    const firstPage = paginationRange[0];

    return (
        <div className={styles.container}>
            <button
                className={styles.prevPage}
                onClick={onPrevious}
                disabled={currentPage === firstPage}
            >
                <span>Prev</span>
            </button>

            {paginationRange?.length &&
                paginationRange.map((pageNumber, index: number) => {
                    if (pageNumber === DOTS) {
                        return <span>&#8230;</span>
                    }

                    return (
                        <button
                            className={`${styles.pagination__number} ${currentPage === index + 1 ? styles.active : ""}`}>
                            {pageNumber}
                        </button>
                    );
                })
            }

            <button
                className={styles.nextPage}
                onClick={onNext}
                disabled={currentPage === lastPage}
            >
                <span>Next</span>
            </button>
        </div>
    );
};
