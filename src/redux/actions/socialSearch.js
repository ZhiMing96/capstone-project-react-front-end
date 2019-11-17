import { UPDATE_SOCIAL_SEARCH } from "./types";
//import history from "../history";

export const updateSocialSearch = (search)=> ({
  type: UPDATE_SOCIAL_SEARCH, 
  payload: search
});


