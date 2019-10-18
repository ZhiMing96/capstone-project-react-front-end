import { UPDATE_SOCIAL_PROFILE} from "../actions/types";
import api from '../../api'

const initialState = {
    profile_image_link: '',
    description: '',
    meetup_ind:'',
    job_search_stage:''
    //preferred_locations
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SOCIAL_PROFILE:
            const newProfile = action.payload;
            return newProfile     
        default:
            return state;
    }
};