const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePremissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/UserController");

router
  .route("/")
  .get(authenticateUser, authorizePremissions("admin"), getAllUsers);

router.route("/showUser").get(authenticateUser, showCurrentUser);

router.route("/updateUser").post(updateUser);

router.route("/updateUserPassword").post(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
