const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Category } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },

    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    users: async (parent, args, context) => {
      if (context.user && context.user.role === "admin") {
        return await User.find({});
      } else {
        throw new AuthenticationError("Admin Only!Not authorized");
      }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }
      throw new AuthenticationError("Not logged in");
    },

    orders: async (parent, args, context) => {
      // If the user is an admin, return all orders.
      if (context.user && context.user.role === "admin") {
        return await Order.find({}).populate("products");
      }
      // If the user is not an admin but is logged in, return their orders.
      else if (context.user && context.user.role === "user") {
        return await Order.find({ userId: context.user._id }).populate(
          "products"
        );
      } else {
        throw new AuthenticationError("Not logged in");
      }
    },

    order: async (parent, { _id }, context) => {
      // Find the order by id
      const order = await Order.findById(_id).populate("products");

      // If the order does not exist, throw an error.
      if (!order) {
        throw new UserInputError("Order does not exist");
      }

      // If the user is the owner of the order or an admin, return the order.
      if (
        context.user &&
        (context.user._id === order.userId || context.user.role === "admin")
      ) {
        return order;
      } else {
        throw new AuthenticationError("Not authorized");
      }
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
