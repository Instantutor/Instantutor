const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// refer to https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#new-diagram
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
    enum: ["open", "close"],
    default: "open",
  },
  state: {
    type: String,
    enum: ["OPENED", "CANCELLED OPENED", "CHECKING", "CANCELLED CHECKING",
            "ASSIGNED", "CANCELLED ASSIGNED", "FULFILLED"],
    default: "OPENED"
  },
  tutor: { // tutor assigned to request
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
});

module.exports = mongoose.model("request", RequestSchema);
