const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var user = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		contact: {
			type: String,
			min: 10,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		aboutme: {
			type: String,
			min: 12,
		},
	},
	{
		versionKey: false,
	}
);

const UsersNames = mongoose.model("users", user);

module.exports = UsersNames;
