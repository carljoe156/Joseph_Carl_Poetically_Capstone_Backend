const Post = require("../models/postModel");
const customError = require("../utils/customError");
const bigPromise = require("../middlewares/bigPromise");

// @desc    Get all posts
// @route   GET '/api/posts'
// @access  Public
exports.getPosts = bigPromise(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @desc    Create a new post
// @route   POST '/api/posts'
// @access  Private
exports.createPost = bigPromise(async (req, res, next) => {
  const { title, content } = req.body;
  const file = req.file ? req.file.filename : undefined;

  // Validate required fields
  if (!title || !content) {
    return next(new customError("Title and content are required fields", 400));
  }

  const post = new Post({ title, content, file });
  const savedPost = await post.save();

  res.status(201).json({
    success: true,
    data: savedPost,
  });
});

// @desc    Like a post
// @route   POST '/api/posts/:postId/like'
// @access  Private
exports.likePost = bigPromise(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new customError("Post not found", 404));
  }

  post.likes += 1;
  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    data: updatedPost,
  });
});

// @desc    Comment on a post
// @route   POST '/api/posts/:postId/comment'
// @access  Private
exports.commentOnPost = bigPromise(async (req, res, next) => {
  const postId = req.params.postId;
  const { text } = req.body;

  // Validate required fields
  if (!text) {
    return next(new customError("Comment text is required", 400));
  }

  const post = await Post.findById(postId);

  if (!post) {
    return next(new customError("Post not found", 404));
  }

  post.comments.push({ text });
  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    data: updatedPost,
  });
});
