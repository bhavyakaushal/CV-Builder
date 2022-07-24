/* Constants */
import { authConstants } from "../constants";

const initialState = {
    loggingIn: false,
    loggedIn: false,
    registered: false,
    user: null,
    error: null
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                loggedIn: false,
                loggingIn: true,
                user: null
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.data
            };
        case authConstants.LOGIN_FAILURE:
            return { loggedIn: false, loggingIn: false, error: action.error };
        case authConstants.REGISTER_REQUEST:
            return {
                registered: false,
                loggedIn: false,
                loggingIn: false,
                user: null
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                registered: true,
                loggedIn: false,
                loggingIn: false,
                user: null
            };
        case authConstants.REGISTER_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,
                registered: false,
                error: action.error
            };
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
                error: null
            };
        default:
            return state;
    }
}
