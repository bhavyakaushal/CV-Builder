/* Models */
const User = require("../models/users");

const bcyprt = require("bcrypt");

module.exports.registerUser = function (data) {
	return new Promise((resolve, reject) => {
		try {
			User.create(data, async function (error, result) {
				if (error) reject(error);
				else {
					resolve(result);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports.checkLoginCredentials = function (email, password) {
	return new Promise((resolve, reject) => {
		try {
			User.findOne(
				{
					email: email,
				},
				function (err, user) {
					const userPasswordFromDb = user.password;
					const passwordMatch = bcyprt.compareSync(password, userPasswordFromDb);
					if (err || !user) {
						reject("Invalid credentials");
					}
					if (err || !passwordMatch) {
						reject("Incorrect password");
					}
					resolve(user);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};
