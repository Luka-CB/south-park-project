const express = require("express");
const {
  addToFavorite,
  getFavorite,
  removeFavorite,
} = require("../controllers/favoriteControllers");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(auth, addToFavorite).get(auth, getFavorite);
router.route("/:id").delete(auth, removeFavorite);

module.exports = router;
