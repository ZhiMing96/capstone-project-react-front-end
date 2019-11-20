 import { UPDATE_PENDING_INVITATIONS, UPDATE_UPCOMING_MEETUP } from "../actions/types";

 const initialState = { 
     pendingInvitations: [],
     upcomingMeetups: []    
};

export default function (state = initialState, action) {
    // console.log("REDUX FOR SOCIAL INTERACTIONSSSSSS")
    const requests = action.payload;
    console.log(requests)

    switch (action.type) {
        case UPDATE_PENDING_INVITATIONS :
            // console.log("!!! ENTERED UPDATE_PENDING_INVITATIONS ")
            return {
            ...state,
            pendingInvitations: [requests]
            }
        case UPDATE_UPCOMING_MEETUP :
            // console.log("!!! ENTERED UPDATE_UPCOMING_MEETUP ")
            return {
                ...state,
                upcomingMeetups: [requests]
            }
        default:
        return state;
    };
}