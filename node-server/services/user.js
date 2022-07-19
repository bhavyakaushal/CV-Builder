/* Models */
const User = require("../models/users");

module.exports.getUserprofileById = function (userId) {
	return new Promise((resolve, reject) => {
		try {
			User.findById(userId).exec((error, result) => {
				if (error) reject(error);
				else resolve(result);
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports.updateProfileById = function (userId, data) {
	return new Promise((resolve, reject) => {
		try {
			User.findByIdAndUpdate(
				userId,
				data,
				{
					new: true,
				},
				function (error, result) {
					if (error) reject(error);
					else resolve(result);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};
