const express = require("express");
const router = express.Router();
const bigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const bookModel = require("../models/bookModel");

// @desc    Home Route
// @route   GET '/'
// @access  Public
// Our route handles the home page response
exports.home = bigPromise(async (req, res, next) => {
  console.log("home"); // Debugging log
  res.status(200).json({
    success: true,
    message: "Welcome to the home page",
  });
});

// @desc    Create a new book
// @route   POST '/api/books'
// @access  Private
// Our function handles creating a new book entry in the database
exports.createBook = bigPromise(async (req, res, next) => {
  const { title, author, genre, year, pages, publisher } = req.body;

  // Validate required fields
  if (!title || !author || !genre || !year || !pages || !publisher) {
    return next(new customError("Please provide all the required fields", 400));
  }

  // Create a new book instance with the provided data
  const newBook = new bookModel({
    title,
    author,
    genre,
    year,
    pages,
    publisher,
  });

  const book = await newBook.save(); // Save the book to the database
  // Respond with the created book
  res.status(201).json({
    success: true,
    data: book,
  });
});

// @desc    Fetch all books
// @route   GET '/api/books'
// @access  Public
// Our function retrieves all book records from the database
exports.getAllBooks = bigPromise(async (req, res, next) => {
  const books = await bookModel.find(); // Fetch all books
  console.log("Fetched books:", books);

  // Respond with our list of books
  res.status(200).json({
    success: true,
    count: books.length, // The Number of books returned
    data: books,
  });
});

// @desc    Fetch a single book by ID
// @route   GET '/api/books/:id'
// @access  Public
// Our function retrieves a book by its ID
exports.getSingleBook = bigPromise(async (req, res, next) => {
  const book = await bookModel.findById(req.params.id); // Find the book by its ID
  if (!book) {
    return next(
      new customError(`Book with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});

// @desc    Update a book
// @route   PUT '/api/books/:id'
// @access  Private
// Our function updates an existing book based on its ID
exports.updateBook = bigPromise(async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre, year, pages, publisher } = req.body;
    if (!bookId) {
      return next(new customError("Please provide book id", 400));
    }
    if (!title || !author || !genre || !year || !pages || !publisher) {
      return next(
        new customError("Please provide all the required fields", 400)
      );
    }
    // Find the book by ID and update it
    const updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, {
      new: true, // Return the updated book
      runValidators: true, // Enforce schema validations via or validation middleware
    });
    // Check if the book exists
    if (!updatedBook) {
      return next(
        new customError(`Book with id ${req.params.id} not found`, 404)
      );
    }
    // Respond with the updated book
    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    // Handle duplicate key error for the title field
    if (error.name === "MongoError" && error.code === 11000) {
      return next(
        new customError("A book with the same title already exists.", 400)
      );
    } else {
      console.error("Error during update:", error); // Log the error
      return next(error); // Pass the error to the error handler
    }
  }
});

// @desc    Delete a book
// @route   DELETE '/api/books/:id'
// @access  Private
// Our function deletes a book based on its ID
exports.deleteBook = bigPromise(async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) {
    return next(new customError("Please provide book id", 400)); // Validate book ID, and returns
  }
  // Find the book by ID and delete it
  const deletedBook = await bookModel.findByIdAndDelete(bookId); // Find the book by ID and delete it
  // Check if the book exists
  if (!deletedBook) {
    return next(
      new customError(`Book with id ${req.params.id} not found`, 404) // Check if the book exists
    );
  }
  res.status(200).json({
    message: `Book with id ${req.params.id} deleted successfully`,
    success: true,
  });
});
