import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { formatter } from "../../core/helpers/formatter";
import { useTransactions } from "../../core/hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const { balance, deposits, withdrawals } = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.balance += transaction.amount;
      }

      if (transaction.type === "withdraw") {
        acc.withdrawals += transaction.amount;
        acc.balance -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdrawals: 0,
      balance: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entries</p>
          <img src={incomeImg} alt="entries" />
        </header>

        <strong>{formatter.price({ value: deposits })}</strong>
      </div>
      <div>
        <header>
          <p>Outputs</p>
          <img src={outcomeImg} alt="entries" />
        </header>

        <strong>-{formatter.price({ value: withdrawals })}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entries</p>
          <img src={totalImg} alt="entries" />
        </header>

        <strong>{formatter.price({ value: balance })}</strong>
      </div>
    </Container>
  );
}
