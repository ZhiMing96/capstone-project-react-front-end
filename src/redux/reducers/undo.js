import { STORE_UNDO, EXECUTE_UNDO } from "../actions/types";

const initialState = { 
  name:'',
  obj:{},
  execute: false

};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_UNDO:
      return {
          ...state,
        name: action.payload.name,
        obj: action.payload.obj
      }
    case EXECUTE_UNDO:
        return{
            ...state,
            execute:action.payload
        }
    default:
      return state;
  }
};
