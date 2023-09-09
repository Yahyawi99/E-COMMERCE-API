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

// Get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id :${id}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.send("update");
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id :${id}`);
  }

  checkPremissions(req.user, review.user);

  await review.remove();

  res.status(StatusCodes.OK).json({ msg: "review deleted successfully!" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
