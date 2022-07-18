const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();

// parse application/x-www-form-urlencoded
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// parse application/json
app.use(bodyParser.json());

/* Middleware */
const middleware = require("../middleware");

/* Controllers */
const controllers = require("../controllers");

app.get(
	"/:userId",

	middleware.verifyToken,
	controllers.user.getUserprofileById
);

app.put(
	"/:userId",

	middleware.verifyToken,
	controllers.user.updateProfile
);

module.exports = app;
