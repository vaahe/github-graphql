import {GitHubLogin} from "../auth/GitHubLogin";
import {Home} from "../pages/Home";
import {RepoCard} from "../pages/RepoCard";
import {RouteObject} from "react-router";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/auth",
        element: <GitHubLogin/>
    },
    {
        path: "/:username/:repository",
        element: <RepoCard/>,
    },
];
