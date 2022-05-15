const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Category {
    categoryName: String
  }

  type Query {
    users: [User]
    user: User
    categories: [Category]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addCategory(categoryName: String!): Category
    removeCategory(categoryName: String!): Category
  }
`;

module.exports = typeDefs;
