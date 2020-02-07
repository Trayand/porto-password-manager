import { 
    LOGIN,
    LOGOUT
 } from "../actionType";

const initialState = null

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return action.user
        case LOGOUT:
            return null
        default:
            return state
    }
}