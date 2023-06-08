import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RepositoryCard: FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack}>Back to Repo's List</button>
      <div style={{ display: "flex" }}>
        <div>
          <img
            src="https://nationaltoday.com/wp-content/uploads/2022/04/Cristiano-Ronaldo-Birthday.jpg"
            alt="avatar"
            width={312}
            height={312}
          />
          <a href="/" style={{ fontSize: "36px", display: "block" }}>
            Nickname
          </a>
        </div>
        <div>
          <h1>Repo Name</h1>
          <p>Stars count</p>
          <p>Last commit</p>
          <p>Used languages</p>
          <p>Repo description</p>
        </div>
      </div>
    </div>
  );
};
