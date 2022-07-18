const session = require("express-session");

/* Config */
const config = require("../config");

module.exports = session({
	secret: config.SESSION.sessionSecret,
	saveUninitialized: true,
	resave: true,
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
		sameSite: "lax",
	},
});
