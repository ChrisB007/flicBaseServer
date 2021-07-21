const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleSchema = new Schema({
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
});

const googleUser = mongoose.model("User", googleSchema);

module.exports = googleUser;
