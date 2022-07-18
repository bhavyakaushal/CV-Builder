const mongoose = require("mongoose");

module.exports.convertStringToObjectId = function (id) {
	return mongoose.Types.ObjectId(id);
};
