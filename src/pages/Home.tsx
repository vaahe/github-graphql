import {useQuery} from "@apollo/client";
import {FC, ChangeEvent, useState, useEffect, useMemo} from "react";

import {GET_CURRENT_USER, GET_CURRENT_REPOSITORIES, SEARCH_REPOSITORIES} from "../graphql/queries";

import styles from "../styles/Home.module.css";
import {FilteredRepos} from "../components/FilteredRepos";
import {CurrentRepos} from "../components/CurrentRepos";


export const Home: FC = () => {
        const queryValue = window?.localStorage?.getItem("query");

        const [query, setQuery] = useState(queryValue || "");

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setQuery(e?.target?.value.trim());
        };

        const currentUser = useQuery(GET_CURRENT_USER);
        const userName = currentUser?.data?.viewer?.login;

        const filtered = useQuery(SEARCH_REPOSITORIES, {
            variables: {queryString: query},
        });

        const current = useQuery(GET_CURRENT_REPOSITORIES, {
            variables: {userName, pageSize: 10},
        });

        useEffect(() => {
            window?.localStorage?.setItem("currentUser", userName);
        }, [userName]);

        useEffect(() => {
            window?.localStorage?.removeItem("query");
            window?.localStorage?.setItem("query", query);
        }, [query]);

        return (
            <div>
                <div className={styles.fieldContainer}>
                    <input type="text" placeholder="Search..." value={query} className={styles.field}
                           onChange={handleChange}/>
                </div>
                <div className={styles.container}>
                    {query?.length ?
                        <FilteredRepos repositories={filtered}/>
                        :
                        <CurrentRepos repositories={current}/>
                    }
                </div>
            </div>
        );
    }
;
