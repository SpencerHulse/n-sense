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
    _id: ID
    categoryName: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    stock: Int
    images: [String]
    primaryImage: String
    category: Category
  }

  type Query {
    users: [User]
    user: User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addCategory(categoryName: String!): Category
    removeCategory(categoryName: String!): Category
    addProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int
      images: [String]
      primaryImage: String
      category: ID!
    ): Product
    removeProduct(_id: ID!): Product
  }
`;

module.exports = typeDefs;
