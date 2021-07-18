import { Container } from "./styles";

export function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <Container isLoading={isLoading} size={50}>
      <div />
    </Container>
  );
}
