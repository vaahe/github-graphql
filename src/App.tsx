import React from "react";
import { useRoutes } from "react-router-dom";

import { routes } from "./routes";

export const App = () => {
  const element = useRoutes(routes);

  return <div className="app">{element}</div>;
};
