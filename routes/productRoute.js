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

//

router
  .route("/")
  .get(getAllProducts)
  .post([authenticateUser, authorizePremissions("admin")], createProduct);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePremissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePremissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePremissions("admin")], deleteProduct);

module.exports = router;
