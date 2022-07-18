/* Utils */
const Utils = require("../utils");

/* Config */
const Config = require("../config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function createMongoDbURI(config, credentials) {
	if (
		credentials.username &&
		credentials.password &&
		credentials.username.trim() !== "" &&
		credentials.password.trim() !== ""
	) {
		return `mongodb://${credentials.username}:${credentials.password}@${config.hostName}:${config.port}/${config.collectionName}`;
	} else {
		return `mongodb://${config.hostName}:${config.port}/${config.collectionName}`;
	}
}

const mongoDbURI = createMongoDbURI(Config.DATABASE, Config.CREDENTIAL);

mongoose.connect(
	mongoDbURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(error) => {
		if (!error) {
			console.log("MongoDB connected");
		} else {
			console.error("Error: " + error);
		}
	}
);
