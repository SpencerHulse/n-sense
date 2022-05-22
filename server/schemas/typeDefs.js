const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    admin: Boolean
    orders: [Order]
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
    details: [String]
    price: Float
    stock: Int
    images: [String]
    primaryImage: String
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Query {
    users: [User]
    user: User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      admin: Boolean
    ): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addCategory(categoryName: String!): Category
    removeCategory(categoryName: String!): Category
    addProduct(
      name: String!
      description: String!
      details: [String]
      price: Float!
      stock: Int
      images: [String]
      primaryImage: String
      category: ID!
    ): Product
    updateProduct(
      _id: ID!
      name: String
      description: String
      details: [String]
      price: Float
      stock: Int
      images: [String]
      primaryImage: String
      category: ID
    ): Product
    removeProduct(_id: ID!): Product
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;
