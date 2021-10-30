const express = require("express");
const {
  createSeason,
  getSeasons,
  updateSeason,
  getSeasonByNum,
} = require("../controllers/seasonControllers");
const { auth, admin } = require("../middlewares/auth");

const router = express.Router();

router.route("/create").post(auth, admin, createSeason);
router.route("/get").get(getSeasons);
router.route("/:num").get(getSeasonByNum);
router.route("/:num/update").put(auth, admin, updateSeason);

module.exports = router;
