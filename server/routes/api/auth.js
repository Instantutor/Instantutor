const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//same as the user.js in api folder, so copy everything in that file
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//needed for verify api testing for right now
//const generateCode = require('../../utils/email').generateCode;
const User = require("../../models/User");
const { route } = require("./users");
const mongoose = require("mongoose");

const EmailVer = require('../../utils/email');

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const fs = require('fs/promises')
const handlebars = require('handlebars')

const client_ID = '263169478503-dajgk2tbveuoij028f1d7gv8uvmmnr1q.apps.googleusercontent.com'
const client_secret = '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'
const redirect_URI = 'https://developers.google.com/oauthplayground/'
const refresh_token = '1//04YXwduuzFRZECgYIARAAGAQSNwF-L9IraAVG7ZwOmuK6Sw2y-7qmwMoQrOxR5tbGJp5dB9EQbFvRoECOJdmA3tOXp7bIS3lnKNA'

const o_auth2_client = new google.auth.OAuth2(client_ID, client_secret, redirect_URI);
o_auth2_client.setCredentials({refresh_token: refresh_token});
// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/',
    //no need fo registration
    //only keep the email and password exists
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //find user
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            //after finding the user, we make sure password match email
            //bcrypt can compare sring and encryptced password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            const payload = {
                user: {//send the user id
                    id: user.id
                }
            };
            //sign the token
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route: put api/auth/code
// @desc: send verfication code to user email
router.put("/code", auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try{
        /*console.log(req.user);*/
        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res
              .status(404)
              .json({ error: [{ msg: "User does not exist" }] });
          }
        const code = EmailVer.generateCode();
        user.verify_code = code;
        await EmailVer.sendEmail(user.email).then(result => console.log('Email:', result)).catch(error => console.log(error.message));
        res.send("Email Successfully Sent");
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
  }); 

// @route: put api/auth/verified
// @desc: check if verfication code recieved by user is inputted correctly
router.put("/verified", auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }



})
module.exports = router;