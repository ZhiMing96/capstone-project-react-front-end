import { combineReducers } from "redux";
import auth from "./auth";
import skill from "./skill";



//const mainReducer = (state = {}, action) => action.type === 'hydrate' ? action.payload : reducers(state, action);

export default combineReducers({auth,skill});
