const express = require("express");
const {
  createComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/commentControllers");
const { auth, admin } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(auth, createComment);
router
  .route("/:id")
  .get(getComments)
  .put(auth, editComment)
  .delete(auth, deleteComment);

module.exports = router;
