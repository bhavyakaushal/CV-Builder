/* Constants */
import { userConstants } from "../constants";

/* Services */
import { userService } from "../services";

export const userActions = {
    updateUserProfile,
    getUserProfile
};

function getUserProfile(userId) {
    return (dispatch) => {
        userService
            .getUserProfile({
                userId: userId
            })
            .then(
                (user) => {
                    if (
                        user.success &&
                        user.userData &&
                        typeof user.userData === "object"
                    ) {
                        dispatch(success(user.userData));
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

    function success(data) {
        return { type: userConstants.GET_PROFILE_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.GET_PROFILE_SUCCESS, error };
    }
}

function updateUserProfile(email, contact, aboutme) {
    return (dispatch) => {
        userService
            .updateUserProfile({
                contact: contact,
                aboutme: aboutme,
                email: email
            })
            .then(
                (user) => {
                    if (
                        user.success &&
                        user.userData &&
                        typeof user.userData === "object"
                    ) {
                        dispatch(success(user.userData));
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

    function success(data) {
        return { type: userConstants.UPDATE_PROFILE_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.UPDATE_PROFILE_FAILURE, error };
    }
}
