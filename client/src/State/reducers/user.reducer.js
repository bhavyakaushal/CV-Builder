/* Constants */
import { userConstants } from "../constants";

const initialState = {
    user: null,
    error: null
};

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.UPDATE_PROFILE_SUCCESS:
            return {
                user: action.data
            };
        case userConstants.UPDATE_PROFILE_FAILURE:
            return {
                error: action.error
            };
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                user: action.data
            };
        case userConstants.GET_PROFILE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}
