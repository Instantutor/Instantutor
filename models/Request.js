const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  request: {
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
  last_edit_time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "open",
  },
  potential_tutors: [
    {
      _id: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      state: {
        type: String,
        default: "UNSEND",
      },
    },
  ],
  selected_tutor: {
    type: String,
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
