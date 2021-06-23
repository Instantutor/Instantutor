const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    request: {
        type: String,
        required: true
    },
    course: {
        type: String,
    },
    grade: {
        type: String
    },
    topic: {
        type: String
    },
    help_time: {
        type: Date
    },
    availability: [
        {
            date: {
                type: Date
            },
            range_start: {
                type: Date
            },
            range_end: {
                type: Date
            }
        }
    ],
    number_sessions: {
        type: Number
    }
});

module.exports = mongoose.model('request', RequestSchema);