/* Utils */
const Utils = require("../utils");

/* Services */
const UserServices = require("../services/user");

module.exports.getUserprofileById = async function (req, res) {
	const { userId } = req.params;

	if (Utils.validations.mongodbObjectIdIsValid(userId)) {
		await UserServices.getUserprofileById(userId)
			.then((result) => {
				res.status(200).json({ status: "success", data: result });
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ status: "failed", error: error });
			});
	} else {
		res.status(400).json({
			status: "failed",
			error: "Wrong UserId format, please validate it",
		});
	}
};

module.exports.updateProfile = async function (req, res) {
	const { userId } = req.params;

	if (Utils.validations.mongodbObjectIdIsValid(userId)) {
		const data = req.body;

		await UserServices.updateProfileById(userId, data)
			.then((result) => {
				res.status(200).json({ status: "success", data: result });
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ status: "failed", error: error });
			});
	} else {
		res.status(400).json({
			status: "failed",
			error: "Wrong UserId format, please validate it",
		});
	}
};
