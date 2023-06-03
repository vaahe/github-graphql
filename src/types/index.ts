export type paginationType = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount: number;
  onPageChange?: (arg0: number) => number;
};

export type repositoryType = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};
