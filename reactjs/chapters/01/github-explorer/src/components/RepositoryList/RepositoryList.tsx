import { useEffect, useState } from "react";
import { Repository, RepositoryItem } from "../RepositoryItem/RepositoryItem";

import "./RepositoryList.scss";

const API_URL = "https://api.github.com/users/william-takayama/repos";

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }
        const repositories = await response.json();
        setRepositories(repositories);
      } catch (e) {
        console.error(e.message);
      }
    }

    getRepositories();
  }, []);

  return (
    <section className="repository-list">
      <h1>Repository List</h1>
      <ul>
        {repositories?.map((repo) => (
          <RepositoryItem key={repo.id} repository={repo} />
        ))}
      </ul>
    </section>
  );
}
