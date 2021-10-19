import React, { createContext, useReducer } from "react";
import Coupon from "../models/coupon";

export enum CartActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  DELETE_CART = "DELETE_CART",
}

type AppState = typeof initialState;

type Action =
  | { type: CartActionType.ADD_TO_CART; payload: Coupon }
  | { type: CartActionType.REMOVE_FROM_CART; payload: Coupon }
  | { type: CartActionType.DELETE_CART; payload: null };

interface CartProviderProps {
  children: React.ReactNode;
}

let initialState = {
  coupons:
    localStorage.getItem("Cart") === null
      ? ([] as Coupon[])
      : (JSON.parse(localStorage["Cart"]) as Coupon[]),
};

const reducer = (state: AppState, action: Action) => {
  const newState = { ...state };

  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      let breakCheck = false;
      for (let i = 0; i < state.coupons.length; i += 1) {
        if (action.payload.id === state.coupons[i].id) {
          breakCheck = true;
          break;
        }
      }
      if (breakCheck) break;
      newState.coupons.push(action.payload);
      localStorage.setItem("Cart", JSON.stringify(newState.coupons));
      break;
    case CartActionType.REMOVE_FROM_CART:
      for (let i = 0; i < newState.coupons.length; i += 1) {
        if (action.payload.id === newState.coupons[i].id) {
          newState.coupons.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("Cart", JSON.stringify(newState.coupons));
      break;
    case CartActionType.DELETE_CART:
      newState.coupons = [];
      break;
    default:
      return state;
  }
  return newState;
};

const CartContext = createContext<{
  cartState: AppState;
  cartDispatch: React.Dispatch<Action>;
}>({ cartState: initialState, cartDispatch: () => {} });

function CartProvider({ children }: CartProviderProps) {
  const [cartState, cartDispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
