const express = require("express");
const {
  register,
  getRatedEpisodes,
  logout,
  login,
  updateUser,
  getUser,
  getFavoriteEpisodes,
  deleteAccount,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(register);
router.route("/rated_episodes").get(auth, getRatedEpisodes);
router.route("/favorite_episodes").get(auth, getFavoriteEpisodes);
router.route("/user").get(auth, getUser);
router.route("/logout").get(auth, logout);
router.route("/login").post(login);
router.route("/update").put(auth, updateUser);
router.route("/delete_account").delete(auth, deleteAccount);

module.exports = router;
