/* Services */
const authServices = require("../services/auth");

/* Utils */
const Utils = require("../utils");

/* JSON Web Token */
const jwt = require("jsonwebtoken");

/* Config */
const Config = require("../config");

const bcyprt = require("bcrypt");
async function generateToken(obj) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				email: obj.email,
				id: obj._id,
			},
			Config.AUTH.BEARER_TOKEN_ENCODER,
			{
				expiresIn: 60 * 90 + "s",
			},
			function (err, token2) {
				if (err) reject(err);
				else resolve(token2);
			}
		);
	});
}

module.exports.registerUser = async function (req, res) {
	const userDetails = req.body || {};

	const { errors } = await Utils.validations.validateUserSchema(userDetails);
	if (!errors) {
		const salt = await bcyprt.genSalt(10);
		userDetails.password = await bcyprt.hash(userDetails.password, salt);
		await authServices
			.registerUser(userDetails)
			.then(async function (result) {
				if (!result) {
					res.status(200).json({
						status: "success",
						error: "User not registered",
					});
				} else {
					res.status(200).json({
						status: "success",
						data: `${result.username} has been registered successfully!`,
					});
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ status: "failed", error: error });
			});
	} else {
		res.status(400).json({
			status: "failed",
			error: errors,
		});
	}
};

module.exports.login = async function (req, res) {
	const AuthDetails = req.body || {};

	if (
		!AuthDetails.email ||
		AuthDetails.email.trim() === "" ||
		!AuthDetails.password ||
		AuthDetails.password.trim() === ""
	) {
		res.status(400).json({
			status: "failed",
			error: "Bad Request : Email or Password not specified",
		});
	} else {
		await authServices
			.checkLoginCredentials(AuthDetails.email, AuthDetails.password)
			.then(async function (result) {
				if (!result) {
					res.status(200).json({
						status: "success",
						error: "Wrong Email or Password",
					});
				} else {
					req.session.user = result;
					req.session.token = await generateToken(result);
					res.status(200).json({ status: "success", data: req.session });
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ status: "failed", error: error });
			});
	}
};
