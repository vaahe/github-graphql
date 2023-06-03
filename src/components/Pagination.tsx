import { usePagination, DOTS } from "../hooks/usePagination";
import { paginationType } from "../types";
import styles from "../styles/Pagination.module.css";

export const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

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
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <button onClick={onPrevious} disabled={currentPage === firstPage}>
            <span>Previous</span>
          </button>
        </li>

        {paginationRange?.length &&
          paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <li>&#8230;</li>;
            }

            return (
              <li
                key={`page_${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}

        <li>
          <button onClick={onNext} disabled={currentPage === lastPage}>
            <span>Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
