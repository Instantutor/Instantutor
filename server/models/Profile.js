const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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

  experience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
      },
      location: {
        type: String,
      },
      from: {
        type: Date
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean
      },
      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

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
