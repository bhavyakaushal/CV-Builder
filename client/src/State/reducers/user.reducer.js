/* Constants */
import { userConstants } from "../constants";

const initialState = {
    user: null,
    skills: null,
    updated: false,
    added: false,
    error: null
};

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updated: true
            };
        case userConstants.ACTION_FAILURE:
            return {
                updated: false,
                added: false,
                error: action.error
            };
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                added: false,
                user: action.data
            };
        case userConstants.ADD_NEW_SKILL:
            return {
                ...state,
                added: true
            };
        case userConstants.GET_USER_SKILLS:
            return {
                ...state,
                skills: action.data,
                added: false
            };
        case userConstants.SEARCH_USER_SKILL:
            return {
                ...state,
                skills: action.data,
                added: false
            };
        default:
            return state;
    }
}
