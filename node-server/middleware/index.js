/* Config */
const Config = require("../config");

/* JSON Web Token */
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");

		const bearerToken = bearer[1];

		if (req.session && req.session.token) {
			await jwt.verify(
				bearerToken,
				Config.AUTH.BEARER_TOKEN_ENCODER,
				(err, decoded) => {
					if (err) {
						console.log(err);
						return res.status(401).send("Unauthorized!");
					}

					req.token = decoded;
					next();
				}
			);
		}
	} else {
		res.status(403).send("Forbiden");
	}
}

module.exports.verifyToken = verifyToken;
