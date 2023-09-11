const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPremissions } = require("../utils");

// get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

// create order
const fakeStripeAPI = async ({ amount, currency }) => {
  const clientSecret = "someRandomValue";
  return { clientSecret, amount };
};

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

  //   calculate total
  const total = subTotal + tax + shippingFee;

  //   get client secret
  const paymentIntent = await fakeStripeAPI({ amount: total, currency: "usd" });

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.clientSecret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

// get single order
const getSingleOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${id}`);
  }

  checkPremissions(req.user, order.user);

  res.status(StatusCodes.OK).json({ order });
};

// get current order
const getCurrentUserOrders = async (req, res) => {
  res.send("get current user order");
};

// update order
const updateOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${id}`);
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
