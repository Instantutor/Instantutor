const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    availability: [
        {
            // tutor = 0, student = 1 or both = 2
            target: {
                type: Number,
                required: true
            },
            // Integers between 0 and 2359 corresponding to military time
            // ie. 0:00 = 0, 0:30 = 30, 1:30 = 130, 14:30 = 1430
            start_time: {
                type: Number,
                required: true
            },
            stop_time: {
                type: Number,
                required: true
            },
            // An array that will hold 7 bools corresponding to days of the week
            days: [
                Boolean
            ],
            start_date: {
                type: Date
            },
            stop_date: {
                type: Date
            },
            exceptions: [
                Date
            ]
        }
    ]
});


module.exports = mongoose.model('calendar', CalendarSchema);