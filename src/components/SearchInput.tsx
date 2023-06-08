import React, { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "ts-debounce";

export const SearchInput = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const debouncedQuery = debounce(handleChange, 400);

  // useEffect(() => {
  //   console.log(query);
  // }, [query]);

  return (
    <form>
      <label>Search for repo:</label>
      <input type="text" onChange={debouncedQuery} />
    </form>
  );
};
