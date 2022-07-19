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
  password: {
    type: String,
    required: true,
  },
  verify_code: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // list of references to requests in database
  stu_request_history: [mongoose.Schema.Types.ObjectId],

  // list of references to requests in database
  tut_request_history: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("user", UserSchema);
