import { gql } from "@apollo/client";

// Requires username, email, and password
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Requires email and password
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Accepts username, email, or password to be updated, requires logged-in user for ID
export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

// Requires a categoryName
export const ADD_CATEGORY = gql`
  mutation addCategory($categoryName: String!) {
    addCategory(categoryName: $categoryName) {
      categoryName
    }
  }
`;

// Requires a categoryName
export const REMOVE_CATEGORY = gql`
  mutation removeCategory($categoryName: String!) {
    removeCategory(categoryName: $categoryName) {
      categoryName
    }
  }
`;

// Requires name, description, price, and category ID
// Strongly advised to also include images, primaryImage, and stock (quantity available)
export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $details: [String]
    $price: Float!
    $stock: Int
    $images: [String]
    $primaryImage: String
    $category: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      details: $details
      price: $price
      stock: $stock
      images: $images
      primaryImage: $primaryImage
      category: $category
    ) {
      _id
      name
      description
      price
      stock
      images
      primaryImage
      category {
        categoryName
      }
    }
  }
`;

// Requires product ID - might consider how to delete images from bucket
export const REMOVE_PRODUCT = gql`
  mutation removeProduct($id: ID!) {
    removeProduct(_id: $id) {
      _id
      name
      description
      price
      stock
      images
      primaryImage
    }
  }
`;

// Requires a product ID, and anything can be changed
export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String
    $description: String
    $details: [String]
    $price: Float
    $stock: Int
    $images: [String]
    $primaryImage: String
    $category: ID
  ) {
    updateProduct(
      _id: $id
      name: $name
      description: $description
      details: $details
      price: $price
      stock: $stock
      images: $images
      primaryImage: $primaryImage
      category: $category
    ) {
      _id
      name
      description
      price
      stock
      images
      primaryImage
      category {
        categoryName
      }
    }
  }
`;

// User must be logged in, and it needs an array of product IDs
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      _id
      purchaseDate
      products {
        _id
      }
    }
  }
`;
