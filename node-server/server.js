const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const cors = require("cors");
// const morgan = require("morgan");
// const favicon = require("serve-favicon");

/* ENV Config */
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
// app.use(morgan("combined", { stream: logger.stream }));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

/* Access static files */
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
// app.use(express.static(path.join(__dirname, "build")));

/* Middleware */
const session = require("./middleware/session");

const port = process.env.PORT || 8080;

/* session */
app.use(session);

/* DB */
require("./db/mongodb");

app.use(function (req, res, next) {
	res.setHeader(
		"Content-Security-Policy",
		"frame-src * https://* ;frame-ancestors * https://*;X-Frame-Options allow-from *;"
	);
	res.setHeader("X-Frame-Options", "allow-from *");
	res.header("Access-Control-Allow-Mxethods", "GET, POST, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin");
	res.header("Access-Control-Allow-Private-Network");
	res.header("Access-Control-Allow-Origin", "*");
	return next();
});

/* Import Routes */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

/* routing */
app.use("/api/auth", authRoutes);
app.use("/api/userProfile", userRoutes);

/* Static React File Access */
// app.get("*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(port, function () {
	console.log("Server is running on port: " + port);
});
