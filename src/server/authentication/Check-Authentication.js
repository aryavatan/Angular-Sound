const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, "secret_string_that_should_be_a_lot_longer");
		next();
	}
	catch (error) {
		res.status(401).json({ message: "User Authentication Failed"});
	}
};