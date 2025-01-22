const express = require("express");
const {
  getPosts,
  createPost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");

const router = express.Router();

// router.route("/").get(getPosts);
router.route("/allposts").post(createPost);
router.route("/posts/:postId/like").post(likePost);
router.route("/posts/:postId/comment").post(commentOnPost);

module.exports = router;
