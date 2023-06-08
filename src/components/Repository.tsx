import { repositoryType } from "../types";
import { useNavigate } from "react-router";

import styles from "../styles/Repository.module.css";

export const Repository = (repository: repositoryType) => {
  const navigate = useNavigate();
  const username: string | null = window?.localStorage?.getItem("username");

  const handleClick = () => {
    navigate(`/${username}/${repository?.name}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <h2>{repository.name}</h2>
      <p>Stars: {repository.stargazerCount}</p>
      <p>Last updated: {repository.updatedAt}</p>
      <span>
        Repo link: <a href={repository.url}>{repository.url}</a>
      </span>
      <hr />
    </div>
  );
};
