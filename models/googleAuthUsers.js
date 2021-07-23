const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: [],
      required: true,
      unique: true,
      max: 50,
    },
    userName: {
      type: String,
    },
    profileImage: {
      type: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const googleUsers = mongoose.model("Users", googleSchema);

module.exports = googleUsers;
