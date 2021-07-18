import produce from "immer";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
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

type ReducerState = {
  transactions: Transaction[];
  isLoading: boolean;
  errorMessage?: string;
};

type ReducerAction =
  | {
      type: "UPDATE_TRANSACTIONS";
      transactions: Transaction[];
    }
  | {
      type: "ERROR";
      message: string;
    }
  | {
      type: "LOADING";
    };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  return produce(state, (draft) => {
    draft.isLoading = false;
    if (action.type === "UPDATE_TRANSACTIONS") {
      draft.transactions = [...draft.transactions, ...action.transactions];
    }

    if (action.type === "LOADING") {
      draft.isLoading = true;
    }

    if (action.type === "ERROR") {
      draft.errorMessage = action.message;
    }
  });
}

interface TransactionContextData extends ReducerState {
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

const initialState: ReducerState = {
  transactions: [],
  isLoading: false,
};

export function TransactionsProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getTransactions() {
      try {
        dispatch({ type: "LOADING" });

        const response = await api.get<{ transactions: Transaction[] }>(
          "/transactions"
        );

        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`;
          throw new Error(message);
        }
        const { transactions } = response.data;

        dispatch({ type: "UPDATE_TRANSACTIONS", transactions });
      } catch (e) {
        dispatch({ type: "ERROR", message: e.message });
        console.error(`[CATCH] - ${e.message}`);
      }
    }

    getTransactions();
  }, []);

  const createTransaction = useCallback(
    async (transactionInput: TransactionInput) => {
      try {
        dispatch({ type: "LOADING" });

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

        dispatch({ type: "UPDATE_TRANSACTIONS", transactions: [transaction] });
      } catch (e) {
        dispatch({ type: "ERROR", message: e.message });
        console.error(`[CATCH] - ${e.message}`);
      }
    },
    []
  );

  const context = useMemo(
    () => ({
      ...state,
      createTransaction,
    }),
    [createTransaction, state]
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
