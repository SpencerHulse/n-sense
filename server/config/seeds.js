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
      name: "Citrus Seagrass",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["citrus-seagrass", "another-one"],
      primaryImage: "citrus-seagrass",
      category: categories[0]._id,
    },
    {
      name: "Coffee Shop",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["coffee-shop", "another-one"],
      primaryImage: "coffee-shop",
      category: categories[0]._id,
    },
    {
      name: "Cozy Cabin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["another-one", "cozy-cabin"],
      primaryImage: "cozy-cabin",
      category: categories[0]._id,
    },
    {
      name: "Honey Vanilla",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["honey-vanilla", "another-one"],
      primaryImage: "honey-vanilla",
      category: categories[0]._id,
    },
    {
      name: "Lavender",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["lavender", "another-one"],
      primaryImage: "lavender",
      category: categories[0]._id,
    },
    {
      name: "Lemon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["lemon", "another-one"],
      primaryImage: "lemon",
      category: categories[0]._id,
    },
    {
      name: "Orange Cassia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["orange-cassia", "another-one"],
      primaryImage: "orange-cassia",
      category: categories[0]._id,
    },
    {
      name: "Sugar Cookies",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["sugar-cookies", "another-one"],
      primaryImage: "sugar-cookies",
      category: categories[0]._id,
    },
    {
      name: "Apple Pie",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["apple-pie", "another-one"],
      primaryImage: "apple-pie",
      category: categories[0]._id,
    },
    {
      name: "Chocolate Brownie",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      images: ["another-one", "chocolate-brownie"],
      primaryImage: "chocolate-brownie",
      category: categories[0]._id,
    },
    {
      name: "Amber and Moss",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Et egestas quis ipsum suspendisse. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut ornare lectus sit amet est placerat in. Posuere ac ut consequat semper viverra nam libero justo. Consequat interdum varius sit amet mattis vulputate. Eu feugiat pretium nibh ipsum consequat. Pulvinar sapien et ligula ullamcorper malesuada proin. Ut lectus arcu bibendum at. Velit dignissim sodales ut eu sem integer vitae justo. Elit ut aliquam purus sit amet luctus venenatis. Imperdiet dui accumsan sit amet nulla facilisi. In nibh mauris cursus mattis molestie a. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      images: ["amber-and-moss", "another-one"],
      primaryImage: "amber-and-moss",
      category: categories[1]._id,
    },
    {
      name: "Black Fig",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Et egestas quis ipsum suspendisse. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut ornare lectus sit amet est placerat in. Posuere ac ut consequat semper viverra nam libero justo. Consequat interdum varius sit amet mattis vulputate. Eu feugiat pretium nibh ipsum consequat. Pulvinar sapien et ligula ullamcorper malesuada proin. Ut lectus arcu bibendum at. Velit dignissim sodales ut eu sem integer vitae justo. Elit ut aliquam purus sit amet luctus venenatis. Imperdiet dui accumsan sit amet nulla facilisi. In nibh mauris cursus mattis molestie a. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      images: ["black-fig", "another-one"],
      primaryImage: "black-fig",
      category: categories[1]._id,
    },
    {
      name: "Patchouli Sweetgrass",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Et egestas quis ipsum suspendisse. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut ornare lectus sit amet est placerat in. Posuere ac ut consequat semper viverra nam libero justo. Consequat interdum varius sit amet mattis vulputate. Eu feugiat pretium nibh ipsum consequat. Pulvinar sapien et ligula ullamcorper malesuada proin. Ut lectus arcu bibendum at. Velit dignissim sodales ut eu sem integer vitae justo. Elit ut aliquam purus sit amet luctus venenatis. Imperdiet dui accumsan sit amet nulla facilisi. In nibh mauris cursus mattis molestie a. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      images: ["patchouli-sweetgrass", "another-one"],
      primaryImage: "patchouli-sweetgrass",
      category: categories[1]._id,
    },
    {
      name: "Sandlewood and Rose",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Et egestas quis ipsum suspendisse. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut ornare lectus sit amet est placerat in. Posuere ac ut consequat semper viverra nam libero justo. Consequat interdum varius sit amet mattis vulputate. Eu feugiat pretium nibh ipsum consequat. Pulvinar sapien et ligula ullamcorper malesuada proin. Ut lectus arcu bibendum at. Velit dignissim sodales ut eu sem integer vitae justo. Elit ut aliquam purus sit amet luctus venenatis. Imperdiet dui accumsan sit amet nulla facilisi. In nibh mauris cursus mattis molestie a. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      images: ["sandlewood-and-rose", "another-one"],
      primaryImage: "sandlewood-and-rose",
      category: categories[1]._id,
    },
    {
      name: "Teakwood and Tobacco",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu. Et egestas quis ipsum suspendisse. Cras sed felis eget velit aliquet sagittis id consectetur purus. Ut ornare lectus sit amet est placerat in. Posuere ac ut consequat semper viverra nam libero justo. Consequat interdum varius sit amet mattis vulputate. Eu feugiat pretium nibh ipsum consequat. Pulvinar sapien et ligula ullamcorper malesuada proin. Ut lectus arcu bibendum at. Velit dignissim sodales ut eu sem integer vitae justo. Elit ut aliquam purus sit amet luctus venenatis. Imperdiet dui accumsan sit amet nulla facilisi. In nibh mauris cursus mattis molestie a. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      images: ["teakwood-and-tobacco", "another-one"],
      primaryImage: "teakwood-and-tobacco",
      category: categories[1]._id,
    },
    {
      name: "Citrus Fresh",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum sit. Purus sit amet volutpat consequat mauris nunc congue. In hendrerit gravida rutrum quisque non tellus orci ac. Id porta nibh venenatis cras sed felis eget. Mi eget mauris pharetra et ultrices neque. Nunc sed blandit libero volutpat. Dignissim enim sit amet venenatis urna cursus. Purus sit amet luctus venenatis lectus magna. Elementum pulvinar etiam non quam lacus. Eget magna fermentum iaculis eu non. Amet nulla facilisi morbi tempus. Risus nullam eget felis eget nunc lobortis mattis. Ultrices mi tempus imperdiet nulla malesuada. At volutpat diam ut venenatis tellus. Id venenatis a condimentum vitae sapien pellentesque habitant. Maecenas volutpat blandit aliquam etiam erat. Volutpat odio facilisis mauris sit amet.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      images: ["citrus-fresh", "another-one"],
      primaryImage: "citrus-fresh",
      category: categories[2]._id,
    },
    {
      name: "Cypress",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum sit. Purus sit amet volutpat consequat mauris nunc congue. In hendrerit gravida rutrum quisque non tellus orci ac. Id porta nibh venenatis cras sed felis eget. Mi eget mauris pharetra et ultrices neque. Nunc sed blandit libero volutpat. Dignissim enim sit amet venenatis urna cursus. Purus sit amet luctus venenatis lectus magna. Elementum pulvinar etiam non quam lacus. Eget magna fermentum iaculis eu non. Amet nulla facilisi morbi tempus. Risus nullam eget felis eget nunc lobortis mattis. Ultrices mi tempus imperdiet nulla malesuada. At volutpat diam ut venenatis tellus. Id venenatis a condimentum vitae sapien pellentesque habitant. Maecenas volutpat blandit aliquam etiam erat. Volutpat odio facilisis mauris sit amet.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      images: ["cypress", "another-one"],
      primaryImage: "cypress",
      category: categories[2]._id,
    },
    {
      name: "Lemon Myrtle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum sit. Purus sit amet volutpat consequat mauris nunc congue. In hendrerit gravida rutrum quisque non tellus orci ac. Id porta nibh venenatis cras sed felis eget. Mi eget mauris pharetra et ultrices neque. Nunc sed blandit libero volutpat. Dignissim enim sit amet venenatis urna cursus. Purus sit amet luctus venenatis lectus magna. Elementum pulvinar etiam non quam lacus. Eget magna fermentum iaculis eu non. Amet nulla facilisi morbi tempus. Risus nullam eget felis eget nunc lobortis mattis. Ultrices mi tempus imperdiet nulla malesuada. At volutpat diam ut venenatis tellus. Id venenatis a condimentum vitae sapien pellentesque habitant. Maecenas volutpat blandit aliquam etiam erat. Volutpat odio facilisis mauris sit amet.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      images: ["lemon-myrtle", "another-one"],
      primaryImage: "lemon-myrtle",
      category: categories[2]._id,
    },
    {
      name: "Orange",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum sit. Purus sit amet volutpat consequat mauris nunc congue. In hendrerit gravida rutrum quisque non tellus orci ac. Id porta nibh venenatis cras sed felis eget. Mi eget mauris pharetra et ultrices neque. Nunc sed blandit libero volutpat. Dignissim enim sit amet venenatis urna cursus. Purus sit amet luctus venenatis lectus magna. Elementum pulvinar etiam non quam lacus. Eget magna fermentum iaculis eu non. Amet nulla facilisi morbi tempus. Risus nullam eget felis eget nunc lobortis mattis. Ultrices mi tempus imperdiet nulla malesuada. At volutpat diam ut venenatis tellus. Id venenatis a condimentum vitae sapien pellentesque habitant. Maecenas volutpat blandit aliquam etiam erat. Volutpat odio facilisis mauris sit amet.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      images: ["orange", "another-one"],
      primaryImage: "orange",
      category: categories[2]._id,
    },
    {
      name: "Peppermint",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum sit. Purus sit amet volutpat consequat mauris nunc congue. In hendrerit gravida rutrum quisque non tellus orci ac. Id porta nibh venenatis cras sed felis eget. Mi eget mauris pharetra et ultrices neque. Nunc sed blandit libero volutpat. Dignissim enim sit amet venenatis urna cursus. Purus sit amet luctus venenatis lectus magna. Elementum pulvinar etiam non quam lacus. Eget magna fermentum iaculis eu non. Amet nulla facilisi morbi tempus. Risus nullam eget felis eget nunc lobortis mattis. Ultrices mi tempus imperdiet nulla malesuada. At volutpat diam ut venenatis tellus. Id venenatis a condimentum vitae sapien pellentesque habitant. Maecenas volutpat blandit aliquam etiam erat. Volutpat odio facilisis mauris sit amet.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      images: ["peppermint", "another-one"],
      primaryImage: "peppermint",
      category: categories[2]._id,
    },
    {
      name: "Christmas Wish",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc mattis enim ut tellus. Sit amet purus gravida quis blandit turpis cursus in. Eget arcu dictum varius duis at consectetur lorem donec. Tempor orci dapibus ultrices in iaculis nunc sed augue. Quisque non tellus orci ac auctor augue mauris augue. Iaculis eu non diam phasellus vestibulum lorem sed. Arcu ac tortor dignissim convallis aenean. Mi proin sed libero enim sed faucibus. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Fermentum odio eu feugiat pretium nibh ipsum. Dignissim suspendisse in est ante. Dui ut ornare lectus sit amet est. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Cras sed felis eget velit aliquet sagittis id consectetur purus. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Eget nunc scelerisque viverra mauris. Ullamcorper sit amet risus nullam eget felis eget. Vitae ultricies leo integer malesuada.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      images: ["christmas-wish", "another-one"],
      primaryImage: "christmas-wish",
      category: categories[3]._id,
    },
    {
      name: "Honeysuckle and Orange",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc mattis enim ut tellus. Sit amet purus gravida quis blandit turpis cursus in. Eget arcu dictum varius duis at consectetur lorem donec. Tempor orci dapibus ultrices in iaculis nunc sed augue. Quisque non tellus orci ac auctor augue mauris augue. Iaculis eu non diam phasellus vestibulum lorem sed. Arcu ac tortor dignissim convallis aenean. Mi proin sed libero enim sed faucibus. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Fermentum odio eu feugiat pretium nibh ipsum. Dignissim suspendisse in est ante. Dui ut ornare lectus sit amet est. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Cras sed felis eget velit aliquet sagittis id consectetur purus. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Eget nunc scelerisque viverra mauris. Ullamcorper sit amet risus nullam eget felis eget. Vitae ultricies leo integer malesuada.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      images: ["honeysuckle-and-orange", "another-one"],
      primaryImage: "honeysuckle-and-orange",
      category: categories[3]._id,
    },
    {
      name: "Morning Dew",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc mattis enim ut tellus. Sit amet purus gravida quis blandit turpis cursus in. Eget arcu dictum varius duis at consectetur lorem donec. Tempor orci dapibus ultrices in iaculis nunc sed augue. Quisque non tellus orci ac auctor augue mauris augue. Iaculis eu non diam phasellus vestibulum lorem sed. Arcu ac tortor dignissim convallis aenean. Mi proin sed libero enim sed faucibus. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Fermentum odio eu feugiat pretium nibh ipsum. Dignissim suspendisse in est ante. Dui ut ornare lectus sit amet est. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Cras sed felis eget velit aliquet sagittis id consectetur purus. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Eget nunc scelerisque viverra mauris. Ullamcorper sit amet risus nullam eget felis eget. Vitae ultricies leo integer malesuada.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      images: ["morning-dew", "another-one"],
      primaryImage: "morning-dew",
      category: categories[3]._id,
    },
    {
      name: "Peppermint and Eucalyptus",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc mattis enim ut tellus. Sit amet purus gravida quis blandit turpis cursus in. Eget arcu dictum varius duis at consectetur lorem donec. Tempor orci dapibus ultrices in iaculis nunc sed augue. Quisque non tellus orci ac auctor augue mauris augue. Iaculis eu non diam phasellus vestibulum lorem sed. Arcu ac tortor dignissim convallis aenean. Mi proin sed libero enim sed faucibus. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Fermentum odio eu feugiat pretium nibh ipsum. Dignissim suspendisse in est ante. Dui ut ornare lectus sit amet est. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Cras sed felis eget velit aliquet sagittis id consectetur purus. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Eget nunc scelerisque viverra mauris. Ullamcorper sit amet risus nullam eget felis eget. Vitae ultricies leo integer malesuada.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      images: ["peppermint-and-eucalyptus", "another-one"],
      primaryImage: "peppermint-and-eucalyptus",
      category: categories[3]._id,
    },
    {
      name: "Tea Tree and Charcoal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc mattis enim ut tellus. Sit amet purus gravida quis blandit turpis cursus in. Eget arcu dictum varius duis at consectetur lorem donec. Tempor orci dapibus ultrices in iaculis nunc sed augue. Quisque non tellus orci ac auctor augue mauris augue. Iaculis eu non diam phasellus vestibulum lorem sed. Arcu ac tortor dignissim convallis aenean. Mi proin sed libero enim sed faucibus. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Fermentum odio eu feugiat pretium nibh ipsum. Dignissim suspendisse in est ante. Dui ut ornare lectus sit amet est. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Cras sed felis eget velit aliquet sagittis id consectetur purus. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Eget nunc scelerisque viverra mauris. Ullamcorper sit amet risus nullam eget felis eget. Vitae ultricies leo integer malesuada.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      images: ["tea-tree-and-charcoal", "another-one"],
      primaryImage: "tea-tree-and-charcoal",
      category: categories[3]._id,
    },
  ]);

  console.log("products seeded");

  process.exit();
});
