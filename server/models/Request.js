const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  request: {
    type: String,
  },
  subject: {
    type: String,
  },
  course: {
    type: String,
  },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  help_time: {
    type: String,
  },
  availability: [String],
  number_sessions: {
    type: Number,
  },
  status: {
    type: String,
    default: "open",
  },
  state: {
    type: String,
    default: "OPENED"
  },
  tutor: {
    type: String,
  },
  pinged_tutors: [String], // tutors that the student pinged
  accepted_tutors: [String], // tutors that accepted the request upon being pinged or by claiming interest in the browse requests page
  denied_tutors: [String], // tutors who denied the request or immediately cancelled their acceptance
  cancelled_tutors: [String], // tutors who cancelled their acceptance at any point
  student_rating: {
    type: Number,
    default: -1
  },
  tutor_rating: {
    type: Number,
    default: -1
  },
  bids: [
    {
      bidder_id: {
        type: String,
      },
      fee: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("request", RequestSchema);
