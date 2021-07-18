import { useTransactions } from "../../core/hooks/useTransactions";
import { Loader } from "../Loader";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionTable";
import { Container } from "./styles";

export function Dashboard() {
  const { isLoading } = useTransactions();

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Summary />
      <TransactionTable />
    </Container>
  );
}
