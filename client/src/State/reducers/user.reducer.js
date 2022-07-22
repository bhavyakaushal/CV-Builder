/* Constants */
import { userConstants } from "../constants";

const initialState = {
    user: null,
    skills: null,
    projects: null,
    updated: false,
    skillAdded: false,
    projectAdded: false,
    error: null,
    finalData: null
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
                skillAdded: false,
                projectAdded: false,
                error: action.error
            };
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                skillAdded: false,
                projectAdded: false,
                user: action.data
            };
        case userConstants.ADD_NEW_SKILL:
            return {
                ...state,
                skillAdded: true,
                projectAdded: false
            };
        case userConstants.GET_USER_SKILLS:
            return {
                ...state,
                skills: action.data,
                skillAdded: false,
                projectAdded: false
            };
        case userConstants.SEARCH_USER_SKILL:
            return {
                ...state,
                skills: action.data,
                skillAdded: false,
                projectAdded: false
            };
        case userConstants.ADD_NEW_PROJECT:
            return {
                ...state,
                skillAdded: false,
                projectAdded: true
            };
        case userConstants.GET_USER_PROJECTS:
            return {
                ...state,
                projects: action.data,
                projectAdded: false,
                skillAdded: false
            };
        case userConstants.GET_FINAL_DATA:
            return {
                ...state,
                finalData: action.data,
                projectAdded: false,
                skillAdded: false
            };
        default:
            return state;
    }
}
