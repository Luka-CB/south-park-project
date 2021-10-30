const express = require("express");
const {
  makeRating,
  getRating,
  deleteRating,
  getUserRatings,
} = require("../controllers/ratingControllers");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(auth, makeRating);
router.route("/user_rating").get(auth, getUserRatings);
router.route("/:id").get(auth, getRating).delete(auth, deleteRating);

module.exports = router;
