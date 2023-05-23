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
      try {
        return await Product.findById(_id).populate("category");
      } catch (error) {
        console.log("Error:", error);
      }
    },

    users: async (parent, args, context) => {
      if (context.user && context.user.role === "admin") {
        return await User.find({});
      } else {
        throw new AuthenticationError("Admin user Only!Not authorized");
      }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products.product",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }
      throw new AuthenticationError("Customer user not logged in");
    },

    orders: async (parent, args, context) => {
      // If the user is an admin, return all orders.
      if (context.user && context.user.role === "admin") {
        return await Order.find({}).populate("products.product");
      }
      // If the user is not an admin but is logged in, return their orders.
      else if (context.user && context.user.role === "user") {
        return await Order.find({ userId: context.user._id }).populate(
          "products.product"
        );
      } else {
        throw new AuthenticationError("Not logged in");
      }
    },

    order: async (parent, { _id }, context) => {
      // Find the order by id
      const order = await Order.findById(_id).populate("products.product");

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

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
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

    addProduct: async (parent, args, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError(
          "You are not authorized to do this action, Admin Only!"
        );
      }

      const newProduct = await Product.create({
        name: args.name,
        price: args.price,
        quantity: args.quantity,
        category: args.categoryId,
      });

      return newProduct;
    },

    // updateProduct mutation
    updateProduct: async (parent, args, context) => {
      if (context.user.role !== "admin") {
        throw new AuthenticationError("Not authorized as admin");
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        args._id,
        { ...args },
        { new: true }
      );

      if (!updatedProduct) {
        throw new UserInputError("Failed to update product");
      }

      return updatedProduct;
    },

    // update product quantity
    decrementProductQuantity: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    addOrder: async (parent, { products }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Create a new order
      const order = new Order({
        products,
        userId: context.user._id,
        purchaseDate: new Date(),
      });

      // Save the order to the database
      const savedOrder = await order.save();

      // Populate the product details
      await Order.populate(savedOrder, { path: "products.product" });

      // Return the order
      return savedOrder;
    },

    deleteProduct: async (parent, { _id }, context) => {
      if (context.user && context.user.role === "admin") {
        return await Product.findByIdAndDelete(_id);
      } else {
        throw new AuthenticationError("Not authorized");
      }
    },

    updateOrder: async (parent, { _id, products, status }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Check if user has the right role (optional)
      if (context.user.role !== "admin") {
        throw new AuthenticationError("You don't have permission to do this!");
      }

      // Find order and update it
      const updatedOrder = await Order.findByIdAndUpdate(
        _id,
        { products, status },
        { new: true }
      ).populate("products.product");

      // Return the updated order
      return updatedOrder;
    },

    cancelOrder: async (parent, { _id }, context) => {
      if (context.user) {
        const order = await Order.findById(_id);
        if (!order) {
          throw new Error("Order not found");
        }

        const orderTime = new Date(order.purchaseDate);
        const currentTime = new Date();
        const timeDifference = currentTime - orderTime;

        // 2 hours in milliseconds
        if (timeDifference <= 2 * 60 * 60 * 1000) {
          await Order.findByIdAndDelete(_id);
          return { success: true, message: "Order cancelled" };
        } else {
          throw new Error("Order can't be cancelled after 2 hours");
        }
      } else {
        throw new AuthenticationError("Not authorized");
      }
    },
  },
};

module.exports = resolvers;
