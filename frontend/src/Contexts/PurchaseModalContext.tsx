import { createContext, useReducer } from "react";

export enum PurchaseModalActionType {
  SHOW_PURCHASE_MODAL = "SHOW_PURCHASE_MODAL",
  TYPE_OF_PURCHASE = "SET_TYPE_OF_PURCHASE",
}

type AppState = typeof initialState;

interface PurchaseModalProviderProps {
  children: React.ReactNode;
}

export type Action =
  | { type: PurchaseModalActionType.SHOW_PURCHASE_MODAL; payload: boolean }
  | {
      type: PurchaseModalActionType.TYPE_OF_PURCHASE;
      payload: "singleItem" | "checkout";
    };

let initialState = {
  showPurchaseModal: false,
  typeOfPurchase: "singleItem",
};

const reducer = (state: AppState, action: Action) => {
  const newState = { ...state };

  switch (action.type) {
    case PurchaseModalActionType.SHOW_PURCHASE_MODAL:
      newState.showPurchaseModal = action.payload;
      break;
    case PurchaseModalActionType.TYPE_OF_PURCHASE:
      newState.typeOfPurchase = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};

const PurchaseModalContext = createContext<{
  PurchaseModalState: AppState;
  PurchaseModalDispatch: React.Dispatch<Action>;
}>({ PurchaseModalState: initialState, PurchaseModalDispatch: () => {} });

function PurchaseModalProvider({ children }: PurchaseModalProviderProps) {
  const [PurchaseModalState, PurchaseModalDispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <PurchaseModalContext.Provider
      value={{ PurchaseModalState, PurchaseModalDispatch }}
    >
      {children}
    </PurchaseModalContext.Provider>
  );
}

export { PurchaseModalContext, PurchaseModalProvider };
