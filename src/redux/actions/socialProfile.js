import { UPDATE_SOCIAL_PROFILE } from "./types";
//import history from "../history";

export const updateSocialProfile = (newProfile)=> ({
  type: UPDATE_SOCIAL_PROFILE, 
  payload: newProfile
});


