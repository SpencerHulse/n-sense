import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

// Requires the user from the token (header)
export const QUERY_USER = gql`
  query {
    user {
      _id
      username
      email
      admin
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          price
          primaryImage
          category {
            categoryName
          }
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query {
    categories {
      _id
      categoryName
    }
  }
`;

// Category ID can be added to only return certain results
export const QUERY_PRODUCTS = gql`
  query products($category: ID) {
    products(category: $category) {
      _id
      name
      description
      details
      price
      stock
      primaryImage
      category {
        categoryName
      }
    }
  }
`;

// Requires a product ID
export const QUERY_PRODUCT = gql`
  query product($id: ID!) {
    product(_id: $id) {
      _id
      name
      description
      details
      price
      stock
      primaryImage
      category {
        _id
        categoryName
      }
    }
  }
`;

// Requires user information from the header and an order ID
// All orders can be retrieved from QUERY_USER
export const QUERY_ORDER = gql`
  query order($id: ID!) {
    order(_id: $id) {
      _id
      purchaseDate
      products {
        _id
        name
        price
        primaryImage
        category {
          categoryName
        }
      }
    }
  }
`;

// Requires an array of product IDs
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

// Retrieves a Secure URL used to upload AWS s3 Images
export const QUERY_URL = gql`
  query uploadImage($primaryImage: String!) {
    uploadImage(primaryImage: $primaryImage) {
      url
    }
  }
`;
