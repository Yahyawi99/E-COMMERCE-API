const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");

// get all orders
const getAllOrders = async (req, res) => {
  res.send("get all");
};

// get single order
const getSingleOrder = async (req, res) => {
  res.send("get single");
};

// get current order
const getCurrentUserOrders = async (req, res) => {
  res.send("get current user order");
};

// create order
const createOrder = async (req, res) => {
  res.send("create order");
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
