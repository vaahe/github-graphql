import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "ts-debounce";
import { Pagination } from "../components/Pagination";
import repositories from "../Repositories.json";
import { Repository } from "../components/Repository";

export const Home: FC = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const debouncedQuery = debounce(handleChange, 400);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      Home
      <form>
        <label>Search for repo:</label>
        <input type="text" onChange={debouncedQuery} />
      </form>
      <Link to="/dashboard">Dashboard</Link>
      {repositories.map((repository) => (
        <Repository
          title={repository.title}
          id={repository.id}
          userId={repository.userId}
          completed={repository.completed}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalCount={10}
        pageSize={5}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};
