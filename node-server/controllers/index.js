const userController = require("./user");
const authController = require("./auth");

module.exports = {
	auth: authController,
	user: userController,
};
