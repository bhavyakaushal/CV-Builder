/* Utils */
import { AxiosRequest } from "../../Utils";

/* Config */
import config from "../../Config/envConfig";

export const userService = {
    updateUserProfile,
    getUserProfile,
    addNewSkill,
    getUserSkills,
    searchUserSkill,
    searchUserProjects,
    addNewProjects,
    getUserProjects
};

async function updateUserProfile(props) {
    const response = await AxiosRequest({
        method: "put",
        url: `${config.host}/users`,
        data: props
    });
    const data = response.data;
    return data;
}

async function getUserProfile(props) {
    const response = await AxiosRequest({
        method: "get",
        url: `${config.host}/users/${props.userId}`
    });
    const data = response.data;
    return data;
}

async function addNewSkill(props) {
    const response = await AxiosRequest({
        method: "post",
        url: `${config.host}/users/skill`,
        data: props.skill
    });
    const data = response.data;
    return data;
}

async function getUserSkills(props) {
    const response = await AxiosRequest({
        method: "get",
        url: `${config.host}/users/skill/${props.userId}`
    });
    const data = response.data;
    return data;
}

async function searchUserSkill(props) {
    const response = await AxiosRequest({
        method: "post",
        url: `${config.host}/users/search-skill`,
        data: props
    });
    const data = response.data;
    return data;
}

async function addNewProjects(props) {
    const response = await AxiosRequest({
        method: "post",
        url: `${config.host}/users/project`,
        data: props
    });
    const data = response.data;
    return data;
}

async function getUserProjects(props) {
    const response = await AxiosRequest({
        method: "get",
        url: `${config.host}/users/project/${props.userId}`
    });
    const data = response.data;
    return data;
}

async function searchUserProjects(props) {
    const response = await AxiosRequest({
        method: "post",
        url: `${config.host}/users/search-project`,
        data: props.title
    });
    const data = response.data;
    return data;
}
