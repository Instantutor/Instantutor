const express = require('express');
const router = express.Router();
const config = require("config");
const auth = require('../../middleware/auth');
const User = require("../../models/User");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const fs = require('fs/promises')
const handlebars = require('handlebars')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client_ID = '263169478503-dajgk2tbveuoij028f1d7gv8uvmmnr1q.apps.googleusercontent.com'
const client_secret = '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'
const redirect_URI = 'https://developers.google.com/oauthplayground/'
const refresh_token = '1//04YXwduuzFRZECgYIARAAGAQSNwF-L9IraAVG7ZwOmuK6Sw2y-7qmwMoQrOxR5tbGJp5dB9EQbFvRoECOJdmA3tOXp7bIS3lnKNA'

const o_auth2_client = new google.auth.OAuth2(client_ID, client_secret, redirect_URI);
o_auth2_client.setCredentials({refresh_token: refresh_token});

const generateCode = require('../../utils/email').generateCode;
const sendEmail = require('../../utils/email').sendEmail;

//need to have a route to send the vertification code to the email of the
//user - put requests 

//PUT /api/verify/code
router.put("/code", auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try{
        let user = await User.findOne({ _id: req.params.user_id });
        if (!user) {
            return res
              .status(404)
              .json({ error: [{ msg: "User does not exist" }] });
          }
        const code = generateCode();
        user.verify_code = code;
        sendEmail(user.email).then(result => console.log('Email:', result)).catch(error => console.log(error.message));
        
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}); 

router.put("/verified", auth, async (req, res) => {
    



})
/*
    second route to check if the user inputted the code and if it is the 
    correct one
    need to update database with status of if verified or not
*/