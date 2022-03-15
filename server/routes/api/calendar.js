const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Calendar = require("../../models/Calendar");
const mongoose = require("mongoose");

/*
validators for start time must be before stop time
times must be in divisions of 5
you must have the timezone included

add time zone to the schedule
    - purge only things that happened the day before the previous weeks saturday to keep time zones
    consistent
    - add a route to conver time zones for all the events
    - read more into it here https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone

Make it so you can't post if there is a conflict with the week schedule
*/

const event_checks = [auth, 
    [check("target")
        .notEmpty().withMessage("event must have a target").bail()
        .isInt({min: 0, max: 2}).withMessage("target must be of value 0, 1, or 2")],
    [check("start_time")
        .notEmpty().withMessage("event must have a start time").bail()
        .isInt().withMessage("start time must be an integer").bail()
        .custom(value => value < 2401 && value >= 0 && value % 100 < 60)
        .withMessage("start time must be an integerized format of military time")],
    [check("stop_time")
        .notEmpty().withMessage("event must have a stop time").bail()
        .isInt().withMessage("stop time must be an integer").bail()
        .custom(value => value < 2401 && value >= 0 && value % 100 < 60)
        .withMessage("start time must be an integerized format of military time")],
    [check("days")
        .notEmpty().withMessage("event must have the days for which it is valid").bail()
        .isArray().withMessage("days must be an array").bail()
        .custom(value => value.length === 7).withMessage("array must be of length 7")],
    [check("days.*", "event values must be booleans").isBoolean()],
    [check("start_date").optional({nullable: true})
        .isDate().withMessage("start date must be in a valid date format")],
    [check("stop_date").optional({nullable: true})
        .isDate().withMessage("stop date must be in a valid date format")]
];

// @route: POST api/calendar/frontend
// @desc:  Create a calendar for a user
// @access Private
router.post("/frontend", auth, async (req, res) => {
    try {
        let user_check = await Calendar.findOne({ user: req.user.id });

        if (!user_check) {
            let new_calender = new Calendar({ user: req.user.id });
            new_calender.save();

            res.json({ msg: "Calendar created for account", calendar: new_calender });
        } else {
            res.status(400).json({ errors: [
                {
                    msg: "User already has a calendar associated with their account"
                }
            ] })
        }

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route: GET api/calendar/frontend
// @desc:  Test route to get the full calendar object
// @access Private
router.get("/frontend", auth, async(req, res) => {
    try {
        const calendar = await Calendar.findOne({ user: req.user.id });
        if (calendar)
            res.json(calendar);
        else
            res.status(404).json({ error: "User has no calendar associated with account"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route: POST api/calendar/frontend/event
// @desc:  Add events for a calendar
// @access Private
router.post("/frontend/event",
    event_checks.concat(
        [check("exceptions", "you can not pass exceptions when making event").isEmpty()]
    ),
    
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            target,
            start_time,
            stop_time,
            days,
            start_date,
            stop_date
        } = req.body;

        const event = {
            target: target,
            start_time: start_time,
            stop_time: stop_time,
            days: days,
        }
        if (start_date) event.start_date = start_date;
        if (stop_date) event.stop_date = stop_date;

        try {
            let new_event = await Calendar.findOne({ user: req.user.id });
            if (new_event) {
                // checking for time overlaps
                for (let i = 0; i < new_event["availability"].length; i++) {
                    for (let j = 0; j < 7; j++) {
                        if ((new_event.availability[i].days[j] && event.days[j]) && 
                        ((new_event["availability"][i].start_time <= event.start_time &&
                        event.start_time <= new_event["availability"][i].stop_time) ||
                        (new_event["availability"][i].start_time <= event.stop_time &&
                        event.start_time <= new_event["availability"][i].stop_time) ||
                        (event.start_time <= new_event["availability"][i].start_time &&
                        event.stop_time >= new_event["availability"][i].stop_time))) {
                            return res.status(400).json({ errors: [{msg: "The time overlaps with another event"}] });
                        }
                    }
                }

                new_event["availability"].push(event);
                new_event.save();

                let posted_event = new_event["availability"][new_event["availability"].length - 1];

                res.json({ msg: "New event created", new_event: posted_event });
            } else {
                res.status(404).json({ error: "User has no calendar associated with account"});
            }
        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route: POST api/calendar/frontend/week
// @desc:  Get a list of all the events for a week
// @access Private
router.post("/frontend/week",
    [auth, [
        check("week_start")
            .notEmpty().withMessage("The start of the current week to get must be input")
            .custom(date => !isNaN(new Date(date).getDate()))
            .withMessage("Week start must be a date").bail()
            .custom(date => new Date(date).getDay() === 0)
            .withMessage("Week start must be a Sunday")
            .custom(date => {
                today = new Date()
                return new Date(date) > new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() - 7)
            })
            .withMessage("Week start can not be before the start of the current week")
    ]],
    
    async(req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            week_start
        } = req.body;

        try {
            const calendar = await Calendar.findOne({ user: req.user.id });

            // ensuring time zones are adjusted for
            let week_start_date = new Date(week_start)
            let week_end = new Date(week_start);
            week_end.setDate(week_end.getDate() + 7)
            
            if (calendar)
                res.json(calendar.availability
                    .filter(elem =>
                        (elem.start_date ? elem.start_date <= week_end : true) &&
                        (elem.stop_date ? elem.stop_date >= week_start_date : true)
                    )
                    .map(elem => {
                            elem.exceptions = elem.exceptions.filter(exception => {
                                let exceptionDate = new Date(exception);
                                return exceptionDate > week_start_date && exceptionDate < week_end;
                            }).sort()
                            return elem;
                        }
                    )
                );
            else
                res.status(404).json({ error: "User has no calendar associated with account"});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route: PATCH api/calendar/frontend/clean
// @desc:  Get rids of events that are expired
// @access Private
router.patch("/frontend/clean", auth, async(req, res) => {
    try {
        let edit_calendar = await Calendar.findOne({ user: req.user.id });

        const current_date = new Date();
        const week_start = new Date(current_date.getFullYear(), current_date.getMonth(),
            current_date.getDate()-current_date.getDay());

        if (edit_calendar) {
            edit_calendar["availability"] = edit_calendar["availability"]
                .filter(elem => elem.stop_date ? elem.stop_date > week_start : true)
                .map(elem => {
                    let new_elem = elem;
                    new_elem.exceptions = elem.exceptions.filter(elem => elem > week_start);
                    return new_elem;
                });
            edit_calendar.save();

            res.json({ msg: "Calendar cleaned", updated_calendar: edit_calendar });
        } else {
            res.status(404).json({ error: "User has no calendar associated with account"});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route: PUT api/calendar/frontend/event/
// @desc:  Edit events for a calendar
// @access Private
router.put("/frontend/event/",
    event_checks.concat(
        [check("_id")
            .notEmpty().withMessage("event id must be present")
            .custom(id => mongoose.Types.ObjectId.isValid(id))
            .withMessage("event id must be a valid mongoDB id")],
        [check("new_exception", "an exception must be in a date format")
            .optional({nullable: true}).isDate()]
    ),
    
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            _id,
            target,
            start_time,
            stop_time,
            days,
            start_date,
            stop_date,
            new_exception
        } = req.body;

        const event = {
            _id: _id,
            target: target,
            start_time: start_time,
            stop_time: stop_time,
            days: days,
        }
        if (start_date) event.start_date = start_date;
        if (stop_date) event.stop_date = stop_date;

        try {
            let edit_event = await Calendar.findOne({
                user: req.user.id,
                "availability._id": mongoose.Types.ObjectId(_id)
            });
            
            if (edit_event) {
                // checking for time overlaps
                console.log();
                for (let i = 0; i < edit_event["availability"].length; i++) {
                    for (let j = 0; j < 7; j++) {
                        if (edit_event["availability"][i]._id != event._id &&
                        (edit_event.availability[i].days[j] && event.days[j]) && 
                        ((edit_event["availability"][i].start_time <= event.start_time &&
                        event.start_time <= edit_event["availability"][i].stop_time) ||
                        (edit_event["availability"][i].start_time <= event.stop_time &&
                        event.start_time <= edit_event["availability"][i].stop_time) ||
                        (event.start_time <= edit_event["availability"][i].start_time &&
                        event.stop_time >= edit_event["availability"][i].stop_time))) {
                            return res.status(400).json({ errors: [{msg: "The time overlaps with another event"}] });
                        }
                    }
                }

                edit_event["availability"] = edit_event["availability"].map(
                    elem => elem._id == _id
                        ? new_exception
                            ? elem.exceptions
                                ? { ...event, exceptions: elem.exceptions.concat(new_exception)}
                                : { ...event, exceptions: [new_exception] }
                            : event
                        : elem
                );
                edit_event.save();

                let edited_event = edit_event["availability"].find(
                    elem => elem._id == _id
                );

                res.json({msg: "Event edited", edited_event: edited_event});
            } else {
                res.status(404).json({ error: "Event not found" });
            }

        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route: DELETE api/calendar/frontend/event/:event_id
// @desc:  Delete events for a calendar
// @access Private
router.delete("/frontend/event/:event_id", auth, async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.event_id))
        return res.status(400).json({ error: "Enter a valid event id"})

    try {
        let delete_event = await Calendar.findOne({
            user: req.user.id,
            "availability._id": mongoose.Types.ObjectId(req.params.event_id)
        });

        if (delete_event) {
            let deleted_event = delete_event["availability"].find(
                elem => elem._id == req.params.event_id
            );

            delete_event["availability"] = delete_event["availability"].filter(
                elem => elem._id != req.params.event_id
            );
            delete_event.save();

            res.json({msg: "Event deleted", deleted_event: deleted_event});
        } else {
            res.status(404).json({ error: "Event not found" });
        }


    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route: DELETE api/calendar/frontend
// @desc:  Delete calendar
// @access Private
router.delete("/frontend", auth, async (req, res) => {
    try {
        let delete_calendar = await Calendar.findOneAndDelete({ user: req.user.id });

        if (delete_calendar) {
            res.json({msg: "Calendar for account deleted"});
        } else {
            res.status(404).json({ error: "User has no calendar associated with account"});
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;