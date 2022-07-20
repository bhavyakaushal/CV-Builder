/* Utils */
import { AxiosRequest } from "../../Utils";

/* Config */
import config from "../../Config/envConfig";

export const authService = {
    login,
    register
};

function login(props) {
    return AxiosRequest({
        method: "post",
        url: `${config.host}/users/login`,
        data: props
    })
        .then((response) => response.data)
        .then((data) => {
            if (data.responseData) {
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.responseData)
                );
            }
            return data;
        });
}

function register(props) {
    return AxiosRequest({
        method: "post",
        url: `${config.host}/users`,
        data: props
    })
        .then((response) => response)
        .then((data) => {
            return data;
        });
}
