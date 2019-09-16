import { AUTH_LOGIN, AUTH_LOGOUT } from "./types";
//import history from "../history";

export const doLogin = details => ({
  type: AUTH_LOGIN,
  payload: details
  
});

export const doLogout = () => ({
  type: AUTH_LOGOUT
});



