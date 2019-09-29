import { combineReducers } from "redux";
import auth from "./auth";
import skill from "./skill";
import profile from "./profile";


//const mainReducer = (state = {}, action) => action.type === 'hydrate' ? action.payload : reducers(state, action);

export default combineReducers({auth,skill,profile});
