const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPremissions } = require("../utils");

// get all orders
const getAllOrders = async (req, res) => {
  res.send("get all");
};

// create order
const createOrder = async (req, res) => {
  const { items, tax, shippingFee } = req.body;

  if (!items || items.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide a tax and shipping fee"
    );
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of items) {
    const product = await Product.findOne({ _id: item.product });

    if (!product) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }

    const { _id, name, price, image } = product;

    const SingleOrderItem = {
      name,
      price,
      image,
      amount: item.amount,
      product: _id,
    };

    orderItems = [...orderItems, SingleOrderItem];

    // calculete sub total
    subTotal += price * item.amount;
  }

  console.log(orderItems);
  console.log(subTotal);

  res.send("create order");
};

// get single order
const getSingleOrder = async (req, res) => {
  res.send("get single");
};

// get current order
const getCurrentUserOrders = async (req, res) => {
  res.send("get current user order");
};

// update order
const updateOrder = async (req, res) => {
  res.send("update order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
