/* Constants */
import { authConstants } from "../constants";

/* Services */
import { authService } from "../services";

/* For Axios Interceptor */
import { Axios } from "../../Utils/axiosRequest";

export const authActions = {
    login,
    register,
    logout
};

function register(username, password, email) {
    return (dispatch) => {
        dispatch(request({ name: email }));

        authService
            .register({ username: username, password: password, email: email })
            .then(
                (user) => {
                    if (
                        user.success === true &&
                        user.responseData &&
                        typeof user.responseData === "object"
                    ) {
                        dispatch(success(user.responseData));
                    } else {
                        dispatch(failure(user.error));
                    }
                },
                (error) => {
                    let error_obj = error.response;
                    if (error_obj?.status === 404 || error_obj === undefined) {
                        const final_error_obj = {
                            msg: "Something went wrong, please try again."
                        };
                        dispatch(failure(final_error_obj));
                    }
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
                console.log("user", user);
                if (
                    user.success &&
                    user.responseData &&
                    typeof user.responseData === "object"
                ) {
                    dispatch(success(user.responseData));
                } else {
                    dispatch(failure(user.error));
                }
            },
            (error) => {
                let error_obj = error.response;
                if (error_obj?.status === 404 || error_obj === undefined) {
                    const final_error_obj = {
                        msg: "Something went wrong, please try again."
                    };
                    dispatch(failure(final_error_obj));
                }
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

function logout() {
    return (dispatch) => {
        sessionStorage.clear();
        dispatch({ type: authConstants.LOGOUT });
    };
}

Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 403) {
            sessionStorage.clear();
            // window.location.href = "/";
            authActions.logout();
        }
        return Promise.reject(error);
    }
);
