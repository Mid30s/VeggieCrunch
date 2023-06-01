const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order, Category } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51NDfeeFp6VlKIMI2Doh9Sz6f7KyOMHUkoUv3hhvjRJODzaJGCqgM1qz2bdhGcPvhXnGmmej5ih41nHVisyMPP9aE00IOmqis8e"
);

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
      console.log("Context user:", context.user);
      console.log("Context:", context);
      console.log("Args:", args);
      if (context.user) {
        const user = await User.findById(args._id).populate({
          path: "orders",
          populate: {
            path: "products.product",
          },
        });

        console.log("Fetched user:", user);

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
      console.log("args.products:", args.products);

      // Count product quantities based on product IDs in args.products
      const productCounts = {};
      for (const id of args.products) {
        if (productCounts[id]) {
          productCounts[id]++;
        } else {
          productCounts[id] = 1;
        }
      }

      const line_items = [];

      for (const [id, quantity] of Object.entries(productCounts)) {
        const product = await Product.findById(id);

        const stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
          images: [`${url}/images/${product.image}`],
        });
        console.log("stripeProduct:", stripeProduct);

        const price = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.price * 100,
          currency: "usd",
        });
        console.log("price:", price);

        console.log("Adding line item for product:", product);
        line_items.push({
          price: price.id,
          quantity,
        });
        console.log("line_item:", line_items);
      }

      try {
        console.log("Line items before session creation: ", line_items);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });
        console.log("Stripe session created: ", session);
        return { session: session.id };
      } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
      }
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

      console.log("User authenticated, creating new order...");

      try {
        // Create a new order
        const order = new Order({
          products,
          userId: context.user._id,
          purchaseDate: new Date(),
        });

        // Save the order to the database
        const savedOrder = await order.save();

        console.log("Order created, saving to database...");

        // Populate the product details
        await Order.populate(savedOrder, { path: "products.product" });

        console.log("Product details populated, linking order to user...");

        // Link the order to the user
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error("User not found");
        }
        user.orders.push(savedOrder);
        await user.save();

        console.log("Order linked to user, returning saved order...");

        // Return the order
        return savedOrder;
      } catch (error) {
        console.error("Error occurred while adding order: ", error);
        throw error;
      }
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
