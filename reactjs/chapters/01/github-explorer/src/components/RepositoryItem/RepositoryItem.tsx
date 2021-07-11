interface RepositoryItemProps {
  repository: Repository;
}

export type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

export function RepositoryItem({ repository }: RepositoryItemProps) {
  return (
    <li>
      <strong>{repository?.name}</strong>
      <p>{repository?.description}</p>

      <a href={repository?.html_url}>Access Repository</a>
    </li>
  );
}
