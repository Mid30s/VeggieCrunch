import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $username: String
    $email: String
    $fullName: String
    $address: String
    $phone: String
  ) {
    updateUser(
      username: $username
      email: $email
      fullName: $fullName
      address: $address
      phone: $phone
    ) {
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

export const ADD_ORDER = gql`
  mutation AddOrder($products: [ProductOrderInput]!) {
    addOrder(products: $products) {
      _id
      purchaseDate
      products {
        product {
          _id
          name
        }
        quantity
      }
      status
    }
  }
`;
