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
