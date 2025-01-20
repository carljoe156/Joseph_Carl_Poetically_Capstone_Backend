const express = require("express");
const router = express.Router();
const bigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const Poem = require("../models/poemModel");

// @desc    Home Route
// @route   GET '/'
// @access  Public
// This handles the home page response
exports.home = bigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the P3 app!",
  });
});

// @desc    Create a new poem
// @route   POST '/api/poems'
// @access  Private
// This  our function handles creating a new poem entry in the database
exports.createPoem = bigPromise(async (req, res, next) => {
  const { title, content, style, author, tags } = req.body;

  // Validate required fields
  if (!title || !content || !style) {
    return next(new customError("Please provide all the required fields", 400));
  }

  // Create a new poem instance
  const newPoem = new Poem({
    title,
    content,
    style,
    author, //fix it may be passed as an object 'author' is passed as ObjectId
    tags,
  });

  const savedPoem = await newPoem.save(); // Save the poem to our database

  res.status(201).json({
    success: true,
    data: savedPoem,
  });
});

// @desc    Fetch all poems
// @route   GET '/api/poems'
// @access  Public
// This  our function retrieves all poem records from the database
exports.getAllPoems = bigPromise(async (req, res, next) => {
  const poems = await Poem.find()
    .populate("author", "name email") // Optionally populate author
    .sort({ createdAt: -1 }); // Sort poems by creation date

  res.status(200).json({
    success: true,
    count: poems.length,
    data: poems,
  });
});

// @desc    Fetch a single poem by ID
// @route   GET '/api/poems/:id'
// @access  Public
// This  our function to retrieves a poem by its ID
exports.getPoemById = bigPromise(async (req, res, next) => {
  const poem = await Poem.findById(req.params.id)
    .populate("author", "name email") // Optionally populate author
    .populate("comments"); // Optionally populate comments, if there's any

  if (!poem) {
    return next(
      new customError(`Poem with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: poem,
  });
});

// @desc    Update a poem
// @route   PUT '/api/poems/:id'
// @access  Private
// This  our function  that updates an existing poem based on its ID
exports.updatePoem = bigPromise(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, style, tags } = req.body;

  if (!title || !content || !style) {
    return next(new customError("Please provide all the required fields", 400));
  }

  const updatedPoem = await Poem.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPoem) {
    return next(new customError(`Poem with id ${id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: updatedPoem,
  });
});

// @desc    Delete a poem
// @route   DELETE '/api/poems/:id'
// @access  Private
// This  our function  that deletes a poem based on its ID
exports.deletePoem = bigPromise(async (req, res, next) => {
  const { id } = req.params;

  const deletedPoem = await Poem.findByIdAndDelete(id);

  if (!deletedPoem) {
    return next(new customError(`Poem with id ${id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Poem with id ${id} deleted successfully`,
  });
});

// @desc    Add a like to a poem
// @route   PUT '/api/poems/:id/like'
// @access  Private
// This our function that adds a like to a poem
exports.addLike = bigPromise(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const poem = await Poem.findById(id);
  if (!poem) {
    return next(new customError(`Poem with id ${id} not found`, 404));
  }

  if (poem.likes.includes(userId)) {
    return next(new customError("You have already liked this poem", 400));
  }

  poem.likes.push(userId);
  const updatedPoem = await poem.save();

  res.status(200).json({
    success: true,
    data: updatedPoem,
  });
});

// @desc    Remove a like from a poem
// @route   PUT '/api/poems/:id/unlike'
// @access  Private
// This our function that removes a like from a poem
exports.removeLike = bigPromise(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const poem = await Poem.findById(id);
  if (!poem) {
    return next(new customError(`Poem with id ${id} not found`, 404));
  }

  const likeIndex = poem.likes.indexOf(userId);
  if (likeIndex === -1) {
    return next(new customError("You haven't liked this poem", 400));
  }

  poem.likes.splice(likeIndex, 1);
  const updatedPoem = await poem.save();

  res.status(200).json({
    success: true,
    data: updatedPoem,
  });
});
