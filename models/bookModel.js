const mongoose = require("mongoose");
const validator = require("validator");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    maxlength: [50, "Book title cannot exceed 50 characters"],
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Book author is required"],
    maxlength: [100, "Book author cannot exceed 100 characters"],
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    trim: true,
  },
  pages: {
    type: Number,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Our Book indexes
BookSchema.index({ title: 1 }, { unique: true }); //  For unique titles
BookSchema.index({ author: 1 }); // Index for faster searches by author/s
BookSchema.index({ genre: 1 }); // Index for genre-based filtering
BookSchema.index({ year: 1 }); // Index for year-based sorting or filtering

module.exports = mongoose.model("Book", BookSchema);
