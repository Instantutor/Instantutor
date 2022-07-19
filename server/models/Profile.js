const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  avatar: {
    type: String
  },
  degree: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  major: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  expertise: [
    {
      area: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true
      }
    },
  ],

});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
