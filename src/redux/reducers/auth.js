import { AUTH_LOGIN, AUTH_LOGOUT } from "../actions/types";

const initialState = {
  user_id:''
};

export default function (state = initialState, action) { 
  switch (action.type) {
    case AUTH_LOGIN:
      const userId = action.payload; //deconstructuring assignment 
      console.log(action.payload)
      return {
        user_id:userId
      };
    case AUTH_LOGOUT:
      console.log("logout")
      return initialState;
    default:
      return state;
  }
};
