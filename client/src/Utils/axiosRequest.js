import Axios from "axios";

import { authHeader } from "../Utils";

const AxiosRequest = ({
    withAuthHeader = true,
    method = "get",
    url,
    ...props
}) => {
    if (url) {
        if (withAuthHeader) {
            return Axios({
                method: method,
                baseURL: process.env.REACT_APP_API_URL,
                url: url,
                headers: authHeader(),
                ...props
            });
        } else
            return Axios({
                method: method,
                baseURL: process.env.REACT_APP_API_URL,
                url: url,
                ...props
            });
    } else new Error("No URL specified while sending Request");
};

export { AxiosRequest, Axios };
