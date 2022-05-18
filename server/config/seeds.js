const db = require("./connection");
const { User, Category, Product } = require("../models");

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

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "product one",
      description: "The first of many...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 1.99,
      stock: 1,
      images: ["placeholder1", "placeholder2"],
      primaryImage: "placeholder1",
      category: categories[0]._id,
    },
    {
      name: "product two",
      description: "Two makes a pair...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 2.99,
      stock: 2,
      images: ["placeholder3", "placeholder4"],
      primaryImage: "placeholder3",
      category: categories[2]._id,
    },
    {
      name: "product three",
      description: "Musketeers or something diabolical...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 3.99,
      stock: 3,
      images: ["placeholder5", "placeholder6"],
      primaryImage: "placeholder6",
      category: categories[3]._id,
    },
    {
      name: "product four",
      description: "Four is two pairs...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 4.99,
      stock: 4,
      images: ["placeholder8", "placeholder7"],
      primaryImage: "placeholder7",
      category: categories[1]._id,
    },
    {
      name: "product five",
      description: "Some kind of middle child...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 5.99,
      stock: 5,
      images: ["placeholder10", "placeholder9"],
      primaryImage: "placeholder10",
      category: categories[0]._id,
    },
    {
      name: "product six",
      description: "Six makes six...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 6.99,
      stock: 6,
      images: ["placeholder11", "placeholder12"],
      primaryImage: "placeholder11",
      category: categories[1]._id,
    },
    {
      name: "product seven",
      description: "Seven eight nine...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 7.99,
      stock: 7,
      images: ["placeholder13", "placeholder14"],
      primaryImage: "placeholder14",
      category: categories[3]._id,
    },
    {
      name: "product eight",
      description: "There is no god...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 8.99,
      stock: 8,
      images: ["placeholder15", "placeholder16"],
      primaryImage: "placeholder16",
      category: categories[2]._id,
    },
    {
      name: "product nine",
      description: "To the nines...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 9.99,
      stock: 9,
      images: ["placeholder17", "placeholder18"],
      primaryImage: "placeholder18",
      category: categories[2]._id,
    },
    {
      name: "product ten",
      description: "The last of many...",
      details: ["Wow, a detail...", "Stop asking."],
      price: 10.99,
      stock: 10,
      images: ["placeholder19", "placeholder20"],
      primaryImage: "placeholder19",
      category: categories[0]._id,
    },
  ]);

  console.log("products seeded");

  process.exit();
});
