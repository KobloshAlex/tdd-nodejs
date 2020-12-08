const User = require("./User");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/api/1.0/users", async (req, res) => {
	const hash = await bcrypt.hash(req.body.password, 10);
	const user = { ...req.body, password: hash };
	await User.create(user);
	return res.status(200).send({ message: "user created" });
});

module.exports = router;
