import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//     }
//   }
// `;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(_id: $userId) {
      _id
      username
      email
      role
      fullName
      address
      phone
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      image
      price
      quantity
      category {
        _id
        name
      }
      inStock
      organic
    }
  }
`;
