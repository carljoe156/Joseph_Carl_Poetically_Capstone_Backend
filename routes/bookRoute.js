const express = require("express");
const router = express.Router();

// OUR CRUD HTTP METHODS:
// @route   GET /
// @desc    Home route for the application
// @access  Public
router.route("/").get(home);

// @route   POST /create
// @desc    Create a new book
// @access  Private (authentication required)
router.route("/create").post(bigPromise(createBook));

// @route   GET /allbooks
// @desc    Retrieve all books
// @access  Public
router.route("/allbooks").get(getAllBooks);

// @route   GET /book/:id
// @desc    Get a single book by ID
// @access  Public
router.route("/book/:id").get(getSingleBook);

// @route   PUT /update/:id
// @desc    Update book details by ID
// @access  Public
router.route("/update/:id").put(bigPromise(updateBook));

// @route   DELETE /delete/:id
// @desc    Delete a book by ID
// @access  Private (authentication required)
router.route("/delete/:id").delete(bigPromise(deleteBook));

module.exports = router;
