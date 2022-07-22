/* Constants */
import { userConstants } from "../constants";

/* Services */
import { userService } from "../services";

export const userActions = {
    updateUserProfile,
    getUserProfile,
    addNewSkill,
    getUserSkills,
    searchUserSkill,
    addNewProjects,
    getUserProjects
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
        return { type: userConstants.ACTION_FAILURE, error };
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
        return { type: userConstants.ACTION_FAILURE, error };
    }
}

function addNewSkill(skill, rating, userId) {
    return (dispatch) => {
        userService
            .addNewSkill({
                skill: skill,
                rating: rating,
                userId: userId
            })
            .then(
                (user) => {
                    if (user.success) {
                        dispatch(success(true));
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
        return { type: userConstants.ADD_NEW_SKILL, data };
    }
    function failure(error) {
        return { type: userConstants.ACTION_FAILURE, error };
    }
}

function getUserSkills(userId) {
    return (dispatch) => {
        userService
            .getUserSkills({
                userId: userId
            })
            .then(
                (user) => {
                    if (
                        user.success &&
                        user.userSkills &&
                        typeof user.userSkills === "object"
                    ) {
                        dispatch(success(user.userSkills));
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
        return { type: userConstants.GET_USER_SKILLS, data };
    }
    function failure(error) {
        return { type: userConstants.ACTION_FAILURE, error };
    }
}

function searchUserSkill(skillName, userId) {
    return (dispatch) => {
        userService
            .searchUserSkill({
                skillName: skillName,
                userId: userId
            })
            .then(
                (user) => {
                    if (user.success && user.searchedSkill) {
                        dispatch(success(user.searchedSkill));
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
        return { type: userConstants.SEARCH_USER_SKILL, data };
    }
    function failure(error) {
        return { type: userConstants.ACTION_FAILURE, error };
    }
}

function getUserProjects(userId) {
    return (dispatch) => {
        userService
            .getUserProjects({
                userId: userId
            })
            .then(
                (user) => {
                    if (
                        user.success &&
                        user.userProjects &&
                        typeof user.userProjects === "object"
                    ) {
                        dispatch(success(user.userProjects));
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
        return { type: userConstants.GET_USER_PROJECTS, data };
    }
    function failure(error) {
        return { type: userConstants.ACTION_FAILURE, error };
    }
}

function addNewProjects(title, description, userId, skillName) {
    return (dispatch) => {
        userService
            .addNewSkill({
                title: title,
                description: description,
                userId: userId,
                skillName: skillName
            })
            .then(
                (user) => {
                    if (user.success) {
                        dispatch(success(true));
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
        return { type: userConstants.ADD_NEW_PROJECT, data };
    }
    function failure(error) {
        return { type: userConstants.ACTION_FAILURE, error };
    }
}
