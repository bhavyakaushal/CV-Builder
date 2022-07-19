/* Constants */
import { authConstants } from "../constants";

/* Utils */
import { getSessionFromStorage } from "../../Utils";

let user_data = getSessionFromStorage();

const initialState = user_data?.token
    ? {
          loggingIn: false,
          loggedIn: true,
          registered: true,
          registering: false,
          user: user_data
      }
    : {
          loggingIn: false,
          loggedIn: false,
          registered: false,
          registering: false,
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
                registering: true,
                loggedIn: false,
                loggingIn: false,
                user: null
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                registered: true,
                loggedIn: false,
                loggingIn: false,
                registering: false,
                user: null
            };
        case authConstants.REGISTER_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,
                registered: false,
                registering: false,
                error: action.error
            };
        default:
            return state;
    }
}
