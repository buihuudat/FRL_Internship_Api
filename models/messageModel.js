const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: Array,
    message: {
      type: String,
      required: true,
    },
    reply: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.indexes({ user: 1 });

module.exports = mongoose.model("Message", messageSchema);
