const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentRequestSchema = new Schema({
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

module.exports = mongoose.model('studentrequest', StudentRequestSchema);