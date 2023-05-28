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

  type ProductOrder {
    product: Product
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [ProductOrder]
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

  input ProductOrderInput {
    product: ID!
    quantity: Int!
  }

  type CancelOrderResponse {
    success: Boolean
    message: String
  }

  type Query {
    categories: [Category]
    users: [User]
    user(_id: ID!): User
    products: [Product]
    product(_id: ID!): Product
    orders: [Order]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(
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
      _id: ID!
      name: String
      description: String
      image: String
      price: Float
      quantity: Int
      categoryId: ID
      inStock: Boolean
      organic: Boolean
    ): Product

    decrementProductQuantity(_id: ID!, quantity: Int!): Product
    deleteProduct(_id: ID!): Product
    addOrder(products: [ProductOrderInput]!): Order
    updateOrder(_id: ID!, products: [ProductOrderInput], status: String): Order
    cancelOrder(_id: ID!): CancelOrderResponse
  }
`;

module.exports = typeDefs;
