const express = require('express');
const request = require('request')
const config = require('config')

const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Request = require('../../models/Request');
const User = require('../../models/User');


router.post('/', [auth, [
        check('request', 'request content is required')
            .not()
            .isEmpty(),
    ]],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            request,
            course,
            grade,
            topic,
            help_time,
            availability,
            number_sessions
        } = req.body;

        const requestFields = {};
        requestFields.name = req.user.name;
        requestFields.user = req.user.id;
        if (request) requestFields.request = request;
        if (course) requestFields.course = course;
        if (grade) requestFields.grade = grade;
        if (topic) requestFields.topic = topic;
        if (help_time) requestFields.help_time = help_time;
        if (availability) requestFields.availability = availability;
        if (number_sessions) requestFields.number_sessions = number_sessions;

        try {
            let newRequest = await Request.findOne({ user: req.user.id });
            
            // TODO:
            // Since we did not set upper bound of #request
            // We will update request when one post new request
            // This is for test, need to be further implement to add upper bound of #request
            if (newRequest) {
                newRequest = await Request.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: requestFields },
                    { new: true }
                );

                return res.json({msg: "Request updated.", request: newRequest});
            }

            newRequest = new Request(requestFields);
            await newRequest.save();
            res.json({ msg: "Request published.", request: newRequest });

        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }
);

router.get('/', auth, async (req, res) => {
    try {
        const reqs = await StudentReq.find().sort({ date: -1 });
        res.json(reqs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;