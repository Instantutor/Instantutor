const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Calendar = require("../../models/Calendar");
const mongoose = require("mongoose");

const event_checks = [auth, 
    [check("event", "event content is required").notEmpty()],
    [check("event.target")
        .notEmpty().withMessage("event must have a target").bail()
        .isInt({min: 0, max: 2}).withMessage("target must be of value 0, 1, or 2")],
    [check("event.start_time")
        .notEmpty().withMessage("event must have a start time").bail()
        .isInt().withMessage("start time must be an integer").bail()
        .custom(value => value < 2400 && value >= 0 && value % 100 < 60)
        .withMessage("start time must be an integerized format of military time")],
    [check("event.stop_time")
        .notEmpty().withMessage("event must have a stop time").bail()
        .isInt().withMessage("stop time must be an integer").bail()
        .custom(value => value < 2400 && value >= 0 && value % 100 < 60)
        .withMessage("start time must be an integerized format of military time")],
    [check("event.days")
        .notEmpty().withMessage("event must have the days for which it is valid").bail()
        .isArray().withMessage("days must be an array").bail()
        .custom(value => value.length === 7).withMessage("array must be of length 7")],
    [check("event.days.*", "event values must be booleans").isBoolean()],
    [check("event.start_date").optional({nullable: true})
        .isDate().withMessage("start date must be in a valid date format")],
    [check("event.stop_date").optional({nullable: true})
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
        [check("event.exceptions", "you can not pass exceptions when making event").isEmpty()],
        [check("new_exception", "you can not pass exceptions when making event").isEmpty()]
    ),
    
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            event
        } = req.body;

        try {
            let new_event = await Calendar.findOne({ user: req.user.id });
            if (new_event) {
                new_event["availability"].push(event);
                new_event.save();

                res.json({ msg: "New event created", new_event: event });
            } else {
                res.status(404).json({ error: "User has no calendar associated with account"});
            }
        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route: GET api/calendar/frontend/week
// @desc:  Get a list of all the events for a week
// @access Private
router.get("/frontend/week", auth, async(req, res) => {
    try {
        const calendar = await Calendar.findOne({ user: req.user.id });
        const current_date = new Date();
        if (calendar)
            res.json(calendar.availability.filter(elem =>
                (elem.start_date ? elem.start_date < current_date : true) &&
                (elem.stop_date ? elem.stop_date > current_date : true)
            ));
        else
            res.status(404).json({ error: "User has no calendar associated with account"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route: PUT api/calendar/frontend/clean
// @desc:  Get rids of events that are expired
// @access Private
router.put("/frontend/clean", auth, async(req, res) => {
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

// @route: PUT api/calendar/frontend/event/:event_id
// @desc:  Edit events for a calendar
// @access Private
router.put("/frontend/event/:event_id",
    event_checks.concat(
        [check("event.exceptions.*", 
            "exceptions must be in valid date format").isDate()],
        [check("new_exception", "an exception must be in a date format")
            .optional({nullable: true}).isDate()]
    ),
    
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty() && !mongoose.Types.ObjectId.isValid(req.params.event_id))
            return res.status(400).json( {
                errors: errors.array().concat({ msg: "Event ID is invalid", param: "/:event_id" })
            });
        else if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        else if (!mongoose.Types.ObjectId.isValid(req.params.event_id))
            return res.status(400).json({
                errors: [{ msg: "Event ID is invalid", param: "/:event_id" }]
            });

        var {
            event,
            new_exception
        } = req.body;

        try {
            let edit_event = await Calendar.findOne({
                user: req.user.id,
                "availability._id": mongoose.Types.ObjectId(req.params.event_id)
            });
            
            if (edit_event) {
                event._id = req.params.event_id;
                edit_event["availability"] = edit_event["availability"].map(
                    elem => elem._id == req.params.event_id ?
                    (new_exception ? 
                        { ...event, exceptions: event.exceptions && event.exceptions.length !== 0 ?
                            event.exceptions.concat(new_exception) :
                            event.exceptions
                        } :
                        event
                    ) :
                    elem
                );
                edit_event.save();

                let edited_event = edit_event["availability"].find(
                    elem => elem._id == req.params.event_id
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