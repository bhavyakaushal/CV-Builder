/* Utils */
import { AxiosRequest } from "../../Utils";

/* Config */
import config from "../../Config/envConfig";

export const userService = {
    updateUserProfile,
    getUserProfile
};

async function updateUserProfile(props) {
    const response = await AxiosRequest({
        method: "put",
        url: `${config.host}/users/updateUserprofile`,
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
