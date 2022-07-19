/* eslint-disable import/no-anonymous-default-export */
const dev = {
	host: "http://localhost:8080",
};

const prod = {
	host: "http://localhost:8080",
};

const config = process.env.REACT_APP_ENV === "production" ? prod : dev;

export default {
	...config,
};
