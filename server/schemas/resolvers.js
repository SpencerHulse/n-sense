// Resolvers - Handle the database portion of queries and mutations
const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    // Retrieves all users in the database
    users: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
    // Retrieves the logged-in user
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate({
          path: "orders.products",
          populate: "category",
        });
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    // Retrieves all categories in the database
    categories: async (parent, args) => {
      const categories = await Category.find({});
      return categories;
    },
    products: async (parent, { category }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      const product = await Product.findById(_id).populate("category");
      return product;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      // Parse out the referring URL
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      // execPopulate is required for existing documents (the above already existing)
      // However, in the latest version of Mongoose, it is likely non-existent
      const { products } = await order.populate("products").execPopulate();

      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          /* Works because we have access to the original url,
          but they will only be visible when live (such as on Heroku).
          This is because there is no access on localhost */
          images: [`${url}/images/${products[i].primaryImage}`],
        });
        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          /* Because stripe requires cost in cents */
          unit_amount: products[i].price * 100,
          currency: "usd",
        });
        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      // Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    // Add a new user to the database and log into the site
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Update a pre-existing users information
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    // Login to an existing user account
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // Add a new category to the database
    addCategory: async (parent, args) => {
      return Category.create(args);
    },
    // Remove an existing category from the database
    removeCategory: async (parent, { categoryName }) => {
      return Category.findOneAndDelete({ categoryName });
    },
    // Add a product to the database
    addProduct: async (parent, args) => {
      return Product.create(args);
    },
    // Update an existing product in the database
    updateProduct: async (parent, args) => {
      return await Product.findByIdAndUpdate(args._id, args, {
        new: true,
      }).populate("category");
    },
    // Remove an existing product from the database
    removeProduct: async (parent, { _id }) => {
      return Product.findByIdAndDelete({ _id });
    },
    // Adds an order to a user's orders
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
