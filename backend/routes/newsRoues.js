const express = require("express");
const {
  addNews,
  getNews,
  getSingleNews,
  editNews,
  deleteNews,
  som,
} = require("../controllers/newsControllers");
const { auth, admin } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(auth, admin, addNews).get(getNews);
router
  .route("/:id")
  .get(getSingleNews)
  .put(auth, admin, editNews)
  .delete(auth, admin, deleteNews);

module.exports = router;
