import { UPDATE_PENDING_INVITATIONS, UPDATE_UPCOMING_MEETUP } from "./types";

console.log("REDUX METHOD ACTIVITATED")
export const updatePendingInvitations = (requests) =>({
    type: UPDATE_PENDING_INVITATIONS,
    payload: requests
})

export const updateUpcomingMeetups = (requests) =>({
    type: UPDATE_UPCOMING_MEETUP,
    payload: requests
})