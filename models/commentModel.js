const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    likeCount: Number,
    dislikeCount: Number,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    rate: Number,
    rateCount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
