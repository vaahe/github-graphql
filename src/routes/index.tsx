import { Home } from "../pages/Home";
import { RepositoryCard } from "../pages/RepositoryCard";
import { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:username/:repository",
    element: <RepositoryCard />,
  },
];
