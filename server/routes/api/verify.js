const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require("../../models/User");
const mongoose = require("mongoose");

import {generateCode} from '../../utils/email'
import {sendEmail} from '../../utils/email'

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