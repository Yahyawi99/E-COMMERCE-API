const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePremissions,
} = require("../middleware/authentication");

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

router.route("/").get(authenticateUser, getAllProducts);

router
  .route("/create")
  .post(authenticateUser, authorizePremissions("admin"), createProduct);

router
  .route("/update/:id")
  .patch(authenticateUser, authorizePremissions("admin"), updateProduct);

router
  .route("/delete/:id")
  .delete(authenticateUser, authorizePremissions("admin"), deleteProduct);

router
  .route("/uploadImage")
  .post(authenticateUser, authorizePremissions("admin"), uploadImage);

router.route("/:id").get(authenticateUser, getSingleProduct);

module.exports = router;
