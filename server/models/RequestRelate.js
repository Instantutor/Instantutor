const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestRelateSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  last_check_time: {
    type: Date,
    default: new Date(0),
  },

  closed_requests: [
    {
      request_id: {
        type: String,
      },
      tutor_rating: {
        type: Number,
        default: -1
      },
      student_rating: {
        type: Number,
        default: -1
      }
    },
  ],

  received_requests: [
    {
      request_id: {
        type: String,
      },
      state: {
        type: String,
        default: "CHECKING",
      },
    },
  ],
  tutoring_requests: [
    {
      request_id: {
        type: String,
      },
    },
  ],
  active_requests: [
    {
      request_id: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("requestRelate", RequestRelateSchema);
