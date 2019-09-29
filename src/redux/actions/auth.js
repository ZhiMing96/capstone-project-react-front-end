import { AUTH_LOGIN, AUTH_LOGOUT } from "./types";
//import history from "../history";

export const doLogin = userId => ({
  type: AUTH_LOGIN,
  payload: userId
  
});

export const doLogout = () => ({
  type: AUTH_LOGOUT
});



