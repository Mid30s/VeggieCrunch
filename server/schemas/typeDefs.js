const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
    inStock: Boolean
    organic: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
    status: String
  }

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    role: String
    fullName: String
    address: String
    phone: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    users: [User]
    user(id: ID!): User
    products: [Product]
    product(id: ID!): Product
    orders: [Order]
    order(id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
      fullName: String
      address: String
      phone: String
    ): User
    addProduct(
      name: String!
      description: String
      image: String
      price: Float!
      quantity: Int!
      categoryId: ID!
      inStock: Boolean
      organic: Boolean
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      image: String
      price: Float
      quantity: Int
      categoryId: ID
      inStock: Boolean
      organic: Boolean
    ): Product
    addOrder(products: [ID]!): Order
    updateOrder(id: ID!, products: [ID], status: String): Order
  }
`;

module.exports = typeDefs;
