const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// **************************
// create product
const createProduct = async (req, res) => {
    req.body.user = req.user.userId

    const product = await Product.create(req.body)

    res.status(StatusCodes.CREATED).json({product})
};

// get all product
const getAllProducts = async (req, res) => {
  res.send("get all ");
};

// get single product
const getSingleProduct = async (req, res) => {
  res.send("get single");
};

// update product
const updateProduct = async (req, res) => {
  res.send("update");
};

// delete product
const deleteProduct = async (req, res) => {
  res.send("delete");
};

// upload product
const uploadImage = async (req, res) => {
  res.send("image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
