const express = require('express');
const request = require('request')
const config = require('config')

const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const StudentReq = require('../../models/StudentRequest');
const User = require('../../models/User');


router.post('/', [auth],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newReq = new StudentReq({
                request: req.body.request,
                course: req.body.course,
                grade: req.body.grade,
                topic: req.body.topic,
                user: req.user.id,
                name: user.name
            });

            const req = await newReq.save();
            res.json(req);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/', auth, async (req, res) => {
    try {
        const reqs = await StudentReq.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});