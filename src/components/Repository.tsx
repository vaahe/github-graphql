import React from "react";

import { repositoryType } from "../types";

export const Repository = (repository: repositoryType) => {
  return (
    <div>
      <h1>
        {repository.title} {repository.id}
      </h1>
      <h4>{repository.userId}</h4>
      <h4>{repository.completed}</h4>
    </div>
  );
};
