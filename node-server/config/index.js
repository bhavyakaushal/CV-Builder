const development = require("./development.json");
const common = require("./common.json");

/* Config */
const NODE_ENV = process.env.NODE_ENV || "production";

const final = {
	development,
};

module.exports = {
	...final[NODE_ENV],
	...common,
};
