const createReview = async (req, res) => {
  res.send("create");
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
