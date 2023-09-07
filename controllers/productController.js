const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// **************************
// create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

// get all product
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

// get single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.find0ne({ _id: id });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.find0neAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.find0ne({ _id: id });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${id}`);
  }

  await Product.remove();

  res.status(StatusCodes.OK).json({ message: "Deleted successfully!" });
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
