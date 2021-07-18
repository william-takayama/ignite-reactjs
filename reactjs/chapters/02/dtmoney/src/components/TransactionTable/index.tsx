import { formatter } from "../../core/helpers/formatter";
import { useTransactions } from "../../core/hooks/useTransactions";
import { Container } from "./styles";

export function TransactionTable() {
  const { transactions } = useTransactions();

  return (
    <>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Value</th>
              <th>Category</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {formatter.price({
                    value: transaction.amount,
                  })}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {formatter.date({
                    value: new Date(transaction.createdAt),
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}
