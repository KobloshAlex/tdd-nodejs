const Seqeulize = require("sequelize");

const seqeulize = new Seqeulize("hoaxify", "db-user", "db-pass", {
	dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
});

module.exports = seqeulize;
