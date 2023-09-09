const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPremissions } = require("../utils");

// **********************************
// Create review
const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const doesProductExiste = await Product.findOne({ _id: productId });
  if (!doesProductExiste) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmited = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmited) {
    throw new CustomError.BadRequestError(
      "Review already submited for this product!"
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  res.send("get all");
};

const getSingleReview = async (req, res) => {
  res.send("get one");
};

const updateReview = async (req, res) => {
  res.send("update");
};

const deleteReview = async (req, res) => {
  res.send("delete");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
