/* Constants */
import { authConstants } from "../constants";

/* Services */
import { authService } from "../services";

export const authActions = {
    login,
    register
};

function register(username, password, email) {
    return (dispatch) => {
        dispatch(request({ name: email }));

        authService
            .register({ username: username, password: password, email: email })
            .then(
                (user) => {
                    if (
                        user.data.user &&
                        typeof user.data.user === "object" &&
                        user.data.token &&
                        typeof user.data.token === "string"
                    ) {
                        dispatch(success(user.data));
                    }
                },
                (error) => {
                    const error_obj = error.response;
                    let final_error_obj = {
                        data: {
                            msg: "Error while retrieving Data"
                        }
                    };
                    if (error_obj.status !== 500) final_error_obj = error_obj;
                    dispatch(failure(final_error_obj.data));
                }
            );
    };

    function request(data) {
        return { type: authConstants.REGISTER_REQUEST, data };
    }
    function success(data) {
        return { type: authConstants.REGISTER_SUCCESS, data };
    }
    function failure(error) {
        return { type: authConstants.REGISTER_FAILURE, error };
    }
}

function login(password, email) {
    return (dispatch) => {
        dispatch(request({ name: email }));

        authService.login({ password: password, email: email }).then(
            (user) => {
                if (
                    user.data.user &&
                    typeof user.data.user === "object" &&
                    user.data.token &&
                    typeof user.data.token === "string"
                ) {
                    dispatch(success(user.data));
                }
            },
            (error) => {
                const error_obj = error.response;
                let final_error_obj = {
                    data: {
                        msg: "Error while retrieving Data"
                    }
                };
                if (error_obj.status !== 500) final_error_obj = error_obj;
                dispatch(failure(final_error_obj.data));
            }
        );
    };

    function request(data) {
        return { type: authConstants.LOGIN_REQUEST, data };
    }
    function success(data) {
        return { type: authConstants.LOGIN_SUCCESS, data };
    }
    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error };
    }
}
