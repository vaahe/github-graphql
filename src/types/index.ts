import { ReactNode } from "react";

export type paginationType = {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount: number;
  onPageChange?: (arg0: number) => number;
};

export type repositoryType = {
  name: string;
  stargazerCount: number;
  updatedAt: ReactNode;
  url: string;
};
