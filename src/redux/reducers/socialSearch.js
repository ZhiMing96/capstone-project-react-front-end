import { UPDATE_SOCIAL_SEARCH } from "../actions/types";

const initialState = {
    keyword: '',
    objective: '',
    category: '',
    locations: [],
    results:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SOCIAL_SEARCH:
            const search = action.payload;
            return search
        default:
            return state;
    }
};