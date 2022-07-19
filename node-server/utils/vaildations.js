const mongodb = require("mongodb");
const Joi = require("joi");

const JoiObjectId = (message = "valid id") =>
	Joi.string()
		.trim()
		.regex(/^[0-9a-fA-F]{24}$/, message);

module.exports.mongodbObjectIdIsValid = function mongodbObjectIdIsValid(
	objectId
) {
	return mongodb.ObjectId.isValid(objectId);
};

module.exports.validateUserSchema = async function (data) {
	const UserSchema = Joi.object().keys({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.lowercase()
			.presence("required"),
		username: Joi.string().trim().presence("required"),
		password: Joi.string().presence("required"),
		contact: Joi.string().min(8).presence("optional"),
		aboutme: Joi.string().min(20).presence("optional"),
	});

	try {
		const { warning } = await UserSchema.validateAsync(data, {
			warning: true,
			abortEarly: false,
		});

		if (warning) {
			const errors = _.map(warning.details, ({ message, type }) => ({
				message: message.replace(/['"]/g, ""),
				type,
			}));

			return { value: data, errors: errors };
		} else {
			return { value: data, errors: null };
		}
	} catch (error) {
		const errors = error.details.map(({ message, type }) => ({
			message: message.replace(/['"]/g, ""),
			type,
		}));
		return {
			value: errors._original,
			errors: errors,
		};
	}
};
