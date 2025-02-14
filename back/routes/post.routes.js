const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
