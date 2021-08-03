const mongoose = require('mongoose');

/*

Recurring Events


Weekly Events


*/

const CalendarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    recurring_events: [
        String,
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
            }
        }
    ]
});

// const CalendarSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "user",
//     },
//     availability: [
//         {
//             year: {
//                 type: Number
//             },
//             years: {
//                 start: {
//                     type: Number
//                 },
//                 stop: {
//                     type: Number
//                 }
//             },
//             month: {
//                 type: Number
//             },
//             months: {
//                 start: {
//                     type: Number
//                 },
//                 stop: {
//                     type: Number
//                 }
//             },
//             date: {
//                 type: Number
//             },
//             week_days: [
//                 Number
//             ],
//             time: {
//                 start: {
//                     type: String
//                 },
//                 stop: {
//                     type: String
//                 }
//             }
//         }
//     ]
// });


module.exports = mongoose.model('calendar', CalendarSchema);