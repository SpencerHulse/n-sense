const db = require("./connection");
const { User, Category } = require("../models");

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

  await User.create({
    username: "User3",
    email: "user3@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Candles" },
    { categoryName: "Incense" },
    { categoryName: "Essential Oils" },
    { categoryName: "Soaps" },
  ]);

  console.log("categories seeded");

  process.exit();
});
