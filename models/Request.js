const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    course: {
        type: String
    },
    grade: {
        type: String
    },
    topic: {
        type: String
    }
});

module.exports = mongoose.model('request', RequestSchema);