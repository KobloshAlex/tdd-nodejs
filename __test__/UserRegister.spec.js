const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/User");
const sequelize = require("../src/config/database");

beforeAll(() => {
	return sequelize.sync();
});

beforeEach(() => {
	return User.destroy({
		truncate: true,
	});
});

describe("User registration", () => {
	it("return 200 when request is valid", (done) => {
		request(app)
			.post("/api/1.0/users")
			.send({
				username: "user1",
				email: "user1@mail.com",
				password: "Mmmm1!",
			})
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it("return success message when signup is valid", (done) => {
		request(app)
			.post("/api/1.0/users")
			.send({
				username: "user1",
				email: "user1@mail.com",
				password: "Mmmm1!",
			})
			.then((res) => {
				expect(res.body.message).toBe("user created");
				done();
			});
	});

	it("saves user to DB", (done) => {
		request(app)
			.post("/api/1.0/users")
			.send({
				username: "user1",
				email: "user1@mail.com",
				password: "Mmmm1!",
			})
			.then(() => {
				// query user table
				User.findAll().then((userlist) => {
					expect(userlist.length).toBe(1);
					done();
				});
			});
    });
    
    it("saves the user name and email to db", (done) => {
		request(app)
			.post("/api/1.0/users")
			.send({
				username: "user1",
				email: "user1@mail.com",
				password: "Mmmm1!",
			})
			.then(() => {
				// query user table
				User.findAll().then((userlist) => {
                    const savedUser = userlist[0];
                    
					expect(savedUser.username).toBe("user1");
					expect(savedUser.email).toBe("user1@mail.com");
					done();
				});
			});
    });
    
    it("store hashed password in DB", (done) => {
		request(app)
			.post("/api/1.0/users")
			.send({
				username: "user1",
				email: "user1@mail.com",
				password: "Mmmm1!",
			})
			.then(() => {
				// query user table
				User.findAll().then((userlist) => {
                    const savedUser = userlist[0];

					expect(savedUser.password).not.toBe("Mmmm1!");
					done();
				});
			});
	});
});
