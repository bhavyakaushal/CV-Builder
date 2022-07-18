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

/* Controllers */
const controllers = require("../controllers");

/* Register user */
app.post("/register", controllers.auth.registerUser);

/* User login */
app.get("/login", controllers.auth.login);

// TODO: Reset Password
/*
app.post(
  "/resetPassword",
  
  controllers.user.resetPassword
);
*/

module.exports = app;
