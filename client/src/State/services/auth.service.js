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
        method: "put",
        url: `${config.host}/api/auth/login`,
        data: props
    })
        .then((response) => response.data)
        .then((data) => {
            if (data.data?.token) {
                sessionStorage.setItem("user", JSON.stringify(data.data));
            }
            return data;
        });
}

function register(props) {
    return AxiosRequest({
        method: "post",
        url: `${config.host}/api/auth/register`,
        data: props
    })
        .then((response) => response.data)
        .then((data) => {
            return data;
        });
}
