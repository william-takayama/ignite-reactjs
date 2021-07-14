import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entries</p>
          <img src={incomeImg} alt="entries" />
        </header>

        <strong>U$D 1000</strong>
      </div>
      <div>
        <header>
          <p>Outputs</p>
          <img src={outcomeImg} alt="entries" />
        </header>

        <strong>U$D 10</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entries</p>
          <img src={totalImg} alt="entries" />
        </header>

        <strong>U$D 990</strong>
      </div>
    </Container>
  );
}
