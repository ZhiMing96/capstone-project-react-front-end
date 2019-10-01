import { UPDATE_PROFILE} from "../actions/types";
import api from '../../api'

const initialState = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            const newProfile = action.payload;
            return newProfile     
        default:
            return state;
    }
};
