import { Home } from "../pages/Home";
import { Dashboard } from "../pages/RepositoryCard";
import { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/repository/:id",
    element: <Dashboard />,
  },
];
