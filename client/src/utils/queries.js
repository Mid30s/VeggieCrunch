import { gql } from "@apollo/client";

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

//fetch a single product
export const QUERY_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(_id: $id) {
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ORDERS = gql`
  query Orders($userId: ID!) {
    orders(userId: $userId) {
      _id
      total
      products {
        product {
          _id
          name
          price
        }
        quantity
      }
    }
  }
`;

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      orders {
        _id
        status
        purchaseDate
        products {
          quantity
          product {
            description
            image
            inStock
            name
            organic
            price
            quantity
          }
        }
      }
      role
      fullName
      address
      phone
    }
  }
`;
