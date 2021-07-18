import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import { TransactionType } from "../../components/NewTransactionModal";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: string;
}

export type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionContextData = {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: PropsWithChildren<{}>) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get<{ transactions: Transaction[] }>(
          "/transactions"
        );

        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`;
          throw new Error(message);
        }
        const { transactions } = response.data;

        setTransactions(transactions);
      } catch (e) {
        console.error(`[CATCH] - ${e.message}`);
      }
    }

    getTransactions();
  }, []);

  const createTransaction = useCallback(
    async (transactionInput: TransactionInput) => {
      try {
        const response = await api.post<{ transaction: Transaction }>(
          "/transactions",
          {
            ...transactionInput,
            createdAt: new Date(),
          }
        );

        if (!(response.status === 201)) {
          const message = `An error has occurred: ${response.status}`;
          throw new Error(message);
        }

        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
      } catch (e) {
        console.error(`[CATCH] - ${e.message}`);
      }
    },
    [transactions]
  );

  const context = useMemo(
    () => ({
      transactions,
      createTransaction,
    }),
    [createTransaction, transactions]
  );

  return (
    <TransactionsContext.Provider value={context}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
