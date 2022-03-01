const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require("../../models/User");

import {generateCode} from '../../utils/email'
import {sendEmail} from '../../utils/email'

//need to have a route to send the vertification code to the email of the
//user

/*
    second route to check if the user inputted the code and if it is the 
    correct one
    need to update database with status of if verified or not
*/