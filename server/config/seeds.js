const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    username: "User1",
    email: "user1@testmail.com",
    password: "password12345",
  });

  await User.create({
    username: "User2",
    email: "user2@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
