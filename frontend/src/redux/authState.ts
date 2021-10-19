import OnlineUser from "../models/onlineUser";
import { AuthActionType } from "./authTypes";
import jwtDecode from "jwt-decode";

export class AuthState {
  public loginUser: OnlineUser = new OnlineUser();
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function loginUser(user: OnlineUser): AuthAction {
  return { type: AuthActionType.LOGIN_USER, payload: user };
}

export function logoutUser(): AuthAction {
  return { type: AuthActionType.LOGOUT_USER, payload: null };
}

export function renewToken(token: string): AuthAction {
  return { type: AuthActionType.RENEW_TOKEN, payload: token };
}

export function authReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.LOGIN_USER:
      newState.loginUser.clientType = JSON.parse(
        JSON.stringify(
          JSON.parse(
            JSON.stringify(jwtDecode(action.payload))
          ).authorities.find((auth: any) => auth.authority.startsWith("ROLE_"))
        )
      ).authority.replace("ROLE_", "");
      newState.loginUser.id = JSON.stringify(
        JSON.parse(JSON.stringify(jwtDecode(action.payload))).id
      );
      newState.loginUser.token = action.payload;
      localStorage.setItem("JWT_TOKEN", action.payload);
      break;
    case AuthActionType.LOGOUT_USER:
      newState.loginUser = new OnlineUser();
      localStorage.removeItem("JWT_TOKEN");
      localStorage.removeItem("Cart");
      break;
    case AuthActionType.RENEW_TOKEN:
      newState.loginUser.token = action.payload;
      localStorage.setItem("JWT_TOKEN", action.payload);
      break;
    default:
      return currentState;
  }

  return newState;
}
