import {useQuery} from "@apollo/client";
import {FC} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {GET_REPO_DETAILS} from "../graphql/queries";
import {AiFillGithub} from "react-icons/ai";
import {FaStar} from "react-icons/fa";

import styles from "../styles/RepoCard.module.css";
import {Loading} from "../components/Loading";
import {IoArrowBackOutline} from "react-icons/io5";

export const RepoCard: FC = () => {
    const navigate = useNavigate();
    const {username, repository} = useParams();

    const handleBack = () => {
        navigate(-1);
    };

    const {loading, error, data} = useQuery(GET_REPO_DETAILS, {
        variables: {owner: username, name: repository},
    });

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        console.error(error);
    }

    const repo = data?.repository;

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={handleBack}><IoArrowBackOutline/></button>
            <div className={styles.page}>
                <div className={styles.user}>
                    <img src={repo?.owner?.avatarUrl} alt="Owner's Avatar"/>
                    <a href={repo?.owner?.url} className={styles.userName} target="_blank"
                       title="Go to GitHub profile">
                        <AiFillGithub/>
                        <span>{repo?.owner?.login}</span>
                    </a>
                    <p>{repo?.owner?.name}</p>
                </div>

                <div className={styles.repo}>
                    <div className={styles.repoHeader}>
                        <h2 className={styles.repoName}>{repo?.name}</h2>
                        <p title={"Stars count"}>
                            <FaStar style={{color: "gold", paddingTop: "0.5rem"}}/>
                            <span>{repo?.stargazerCount}</span>
                        </p>
                    </div>

                    <div className={styles.lastCommit}>
                        <h3>Last Commit Date:</h3>
                        <span>{String(repo?.pushedAt).slice(0, 10)}</span>
                    </div>

                    <div className={styles.languages}>
                        <h3>Used Languages:</h3>
                        <ul>
                            {repo?.languages?.nodes?.map((language: object, index: number) => (
                                <li key={`${language?.name}_${index}`}
                                    className={styles.language}>{language?.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.description}>
                        <h3>Description: &nbsp;</h3>
                        <span>{repo?.description || "No description yet"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
