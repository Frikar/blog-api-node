const { Router } = require("express");

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const router = Router();

router.get("/", getAllPosts);

router.get("/:postId", getPost);

router.post("/", createPost);

router.patch("/:postId", updatePost);

router.delete("/:postId", deletePost);

module.exports = router;
