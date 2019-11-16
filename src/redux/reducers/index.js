import { combineReducers } from "redux";
import auth from "./auth";
import skill from "./skill";
import profile from "./profile";
import work from "./work";
import socialProfile from './socialProfile'
import socialInteraction from './socialInteraction'

//const mainReducer = (state = {}, action) => action.type === 'hydrate' ? action.payload : reducers(state, action);

export default combineReducers({auth,skill,profile,work, socialProfile,socialInteraction});
