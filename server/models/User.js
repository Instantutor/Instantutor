const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verify_code: {
    type: String,
  },

  // list of references to requests in database up to 1 week ago to put in user's student request history
  stu_request_history: [mongoose.Schema.Types.ObjectId],

  // list of references to requests in database up to 1 week ago to put in user's tutor request history
  tut_request_history: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("user", UserSchema);
