const db = require("../config/connection");
const { User, Product, Category, Order } = require("../models");
const userSeeds = require("./userSeeds.json");
const productSeeds = require("./productSeeds.json");
const categorySeeds = require("./categorySeeds.json");
const orderSeeds = require("./orderSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});

    await User.create(userSeeds);
    await Product.create(productSeeds);
    await Category.create(categorySeeds);
    await Order.create(orderSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Seeds data all done!");
  process.exit(0);
});
