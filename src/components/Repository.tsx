import {useNavigate} from "react-router";
import {MouseEvent, ReactNode, FC} from "react";
import styles from "../styles/Repository.module.css";

import {FaStar} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";

interface RepositoryProps {
    name: string;
    stargazerCount: number;
    updatedAt: ReactNode;
    url: string;
    author: object | ReactNode;
}

export const Repository: FC<RepositoryProps> = (repository) => {
    const navigate = useNavigate();
    const updatedAt: string = String(repository?.updatedAt).slice(0, 10);
    const userName: string | null = repository?.author || window?.localStorage?.getItem("currentUser");

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/${userName}/${repository?.name}`);
    };

    const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.header}>
                <h3>
                    {repository?.name?.length > 20 ? repository?.name?.slice(0, 20) + '...' : repository?.name}
                </h3>
                <span className={styles.starField}>
          <FaStar style={{color: "gold", margin: "0 .2rem"}}/>
                    {repository?.stargazerCount}
        </span>
            </div>
            <div className={styles.main}>
                <h4>Author: {userName}</h4>
                <p className={styles.lastCommit}>
                    Last updated: {updatedAt}
                </p>
            </div>
            <div className={styles.footer}>
                <a href={repository?.url} className={styles.repoLink} target="_blank" onClick={handleClickLink}>
                    Source code on GitHub
                </a>
                <IoIosArrowForward/>
            </div>
        </div>
    );
};
