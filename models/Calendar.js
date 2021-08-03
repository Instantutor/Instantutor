const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    recurring_events: [
        {
            start: {
                type: Number
            },
            stop: {
                type: Number
            }
        },
    ],
    weekly_events: [
        {
            delete: {
                type: Boolean
            },
            year: {
                type: Number
            },
            month: {
                type: Number
            },
            day: {
                type: Number
            },
            time: {
                start: {
                    type: Number
                },
                stop: {
                    type: Number
                }
            },
        }
    ]
});


module.exports = mongoose.model('calendar', CalendarSchema);