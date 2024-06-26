const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    description: String,
    social: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      default: "male",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "company"],
      default: "user",
    },
    social: {
      type: String,
    },
    address: {
      province: String,
      district: String,
      ward: String,
      street: String,
      lat: String,
      lng: String,
    },

    skills: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
