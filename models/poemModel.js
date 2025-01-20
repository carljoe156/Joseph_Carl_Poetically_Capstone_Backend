const mongoose = require("mongoose");
const validator = require("validator");

const poemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title cannot be longer than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content must be at least 20 characters long"],
    },
    style: {
      type: String,
      required: [true, "Style is required"],
      enum: [
        "Sonnet",
        "Haiku",
        "Free Verse",
        "Limerick",
        "Narrative",
        "Other",
        "Dystopian",
      ], // Some options to get started :)
      default: "Other", // Or if you don't :'(
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User", // Users who liked this poem
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Our Added indexes
poemSchema.index({ tags: 1 });
poemSchema.index({ author: 1 });
poemSchema.index({ tags: 1, author: 1 });

// Virtual for comments
poemSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

poemSchema.set("toJSON", { virtuals: true });
poemSchema.set("toObject", { virtuals: true });

// Middleware for tag formatting (uncomment if I need it )
poemSchema.pre("save", function (next) {
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags.map((tag) => tag.trim().toLowerCase());
  }
  next();
});

module.exports = mongoose.model("Poem", poemSchema);
