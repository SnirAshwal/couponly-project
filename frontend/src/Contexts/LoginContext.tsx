import { createContext, useReducer } from "react";

export enum LoginActionType {
  SHOW_LOGIN_MODAL = "SHOW_LOGIN_MODAL",
}

type AppState = typeof initialState;

interface LoginProviderProps {
  children: React.ReactNode;
}

export type Action = {
  type: LoginActionType.SHOW_LOGIN_MODAL;
  payload: boolean;
};

let initialState = {
  showLoginModal: false,
};

const reducer = (state: AppState, action: Action) => {
  const newState = { ...state };

  switch (action.type) {
    case LoginActionType.SHOW_LOGIN_MODAL:
      newState.showLoginModal = action.payload;
      break;

    default:
      return state;
  }
  return newState;
};

const LoginContext = createContext<{
  LoginState: AppState;
  LoginDispatch: React.Dispatch<Action>;
}>({ LoginState: initialState, LoginDispatch: () => {} });

function LoginProvider({ children }: LoginProviderProps) {
  const [LoginState, LoginDispatch] = useReducer(reducer, initialState);
  return (
    <LoginContext.Provider value={{ LoginState, LoginDispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
