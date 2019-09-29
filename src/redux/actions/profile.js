import { UPDATE_PROFILE } from "./types";
//import history from "../history";

export const updateProfile = (newProfile)=> ({
  type: UPDATE_PROFILE, 
  payload: newProfile
});


