import { AUTH_LOGIN, AUTH_LOGOUT } from "../actions/types";

const initialState = {
  first_name: '',
  last_name: '',
  username: '',
  email: ''
  
};

export default function (state = initialState, action) { 
  switch (action.type) {
    case AUTH_LOGIN:
      const { first_name, last_name, username, email} = action.payload; //deconstructuring assignment 
      return {
        ...state, //return the rest of state object except the properties changes made below
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email
      };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
