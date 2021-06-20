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
    }
});

module.exports = mongoose.model('request', RequestSchema);