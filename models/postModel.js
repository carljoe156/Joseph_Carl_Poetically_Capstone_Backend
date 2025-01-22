const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "A post must have content"],
    },
    file: {
      type: String, // To store file path or URL
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: {
          type: String,
          required: [false],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Post", postSchema);
