const express = require("express");
const {
  addVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoControllers");
const { auth, admin } = require("../middlewares/auth");

const router = express.Router();

router.route("/add").post(auth, admin, addVideo);
router
  .route("/:id")
  .get(getVideo)
  .put(auth, admin, updateVideo)
  .delete(auth, admin, deleteVideo);

module.exports = router;
