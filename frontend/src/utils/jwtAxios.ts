import axios from "axios";
import { CartActionType } from "../Contexts/CartContext";
import { logoutUser, renewToken } from "../redux/authState";
import { store } from "../redux/store";

export const JWTAxios = (history: any, cartDispatch: any) => {
  const jwtAxios = axios.create();

  axios.interceptors.request.use(
    (request) => {
      request.headers = {
        authorization: "Bearer " + store.getState().authState.loginUser.token,
      };
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (store.getState().authState.loginUser.clientType !== "") {
        store.dispatch(
          renewToken(response.headers.authorization.replace("Bearer ", ""))
        );
      }
      return response;
    },
    (error) => {
      if (!error.response) {
        return new Promise((reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem("TIMER");
        store.dispatch(logoutUser());
        cartDispatch({ type: CartActionType.DELETE_CART, payload: null });
        if (history) {
          history.push("/");
        } else {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
      }
    }
  );
  return jwtAxios;
};
