const express = require("express");
const {
  addNewEpisode,
  getEpisode,
  editEpisode,
  deleteEpisode,
  getEpisodes,
  getHighestRatedEpisodes,
  getEpisodesFromLatestSeason,
} = require("../controllers/episodeControllers");
const { admin, auth } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(getEpisodes);
router.route("/highest_rated").get(getHighestRatedEpisodes);
router.route("/latest").get(getEpisodesFromLatestSeason);
router.route("/:id/add").post(auth, admin, addNewEpisode);
router.route("/:id").get(getEpisode);
router.route("/:id/edit").put(auth, admin, editEpisode);
router.route("/:id/delete").delete(auth, admin, deleteEpisode);

module.exports = router;
