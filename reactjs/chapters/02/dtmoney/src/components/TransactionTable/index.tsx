import { Container } from "./styles";

export function TransactionTable() {
  return (
    <Container>
      <table>
        <thead>
          <th>Title</th>
          <th>Value</th>
          <th>Category</th>
          <th>Data</th>
        </thead>

        <tbody>
          <tr>
            <td>Web Development</td>
            <td>U$D 12000</td>
            <td>Development</td>
            <td>13/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
