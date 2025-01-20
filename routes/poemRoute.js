const express = require("express");
const router = express.Router();
const bigPromise = require("../middlewares/bigPromise");

const {
  home,
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  addLike,
  removeLike,
} = require("../controllers/poemController");

// OUR CRUD HTTP METHODS:
// @route   GET /
// @desc    Home route for the poetry application
// @access  Public
router.route("/").get(home);

// @route   POST /create
// @desc    Create a new poem
// @access  Private (authentication required)
router.route("/create").post(createPoem);

// @route   GET /allpoems
// @desc    Retrieve all poems
// @access  Public
router.route("/allpoems").get(getAllPoems);

// @route   GET /poem/:id
// @desc    Get a single poem by ID
// @access  Public
router.route("/poem/:id").get(getPoemById);

// @route   PUT /update/:id
// @desc    Update poem details by ID
// @access  Private (authentication required)
router.route("/update/:id").put(updatePoem);

// @route   DELETE /delete/:id
// @desc    Delete a poem by ID
// @access  Private (authentication required)
router.route("/delete/:id").delete(deletePoem);

// @route   PUT /poem/:id/like
// @desc    Add a like to a poem
// @access  Private (authentication required)
router.route("/poem/:id/like").put(addLike);

// @route   PUT /poem/:id/unlike
// @desc    Remove a like from a poem
// @access  Private (authentication required)
router.route("/poem/:id/unlike").put(removeLike);

module.exports = router;
