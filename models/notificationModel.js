const mongoose = require("mongoose");

const notificationModal = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notifications: [
      {
        title: String,
        body: String,
        companyName: String,
        jobTitle: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        viewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Notification", notificationModal);
