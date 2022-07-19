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
    enum: ["Tutor", "Student", "Both"],
    default: "Student"
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

  // only filled if role is "Tutor" or "Both"
  tutor: {
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
    default: null // if role is "Student"
  },

});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
