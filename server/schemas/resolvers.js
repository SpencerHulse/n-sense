// Resolvers - Handle the database portion of queries and mutations
const { AuthenticationError } = require("apollo-server-express");
const { User, Category } = require("../models");
const { signToken } = require("../utils/auth");
// Will need to import: models, auth, stripe

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
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    // Retrieves all categories in the database
    categories: async (parent, args) => {
      const categories = await Category.find({});
      return categories;
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
  },
};

module.exports = resolvers;
