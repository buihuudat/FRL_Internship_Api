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
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Notification", notificationModal);
