import { UPDATE_PROFILE} from "../actions/types";
import api from '../../api'

const initialState = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    work_experience: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            const newProfile = action.payload;
            console.log({
                ...newProfile,
                work_experience: state.work_experience
            }      )
            return {
                ...newProfile,
                work_experience: state.work_experience
            }      
        default:
            return state;
    }
};
