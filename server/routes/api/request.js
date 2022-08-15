//groundwork for request api based on request lifecycle
/*

const express = require("express");
const request = require("request");
const config = require("config");
const getTutorMatches = require("../../utils/utilities").getTutorMatches;
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Request = require("../../models/Request");
const User = require("../../models/User");
const { route } = require("./users");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const courses = require("../../config/course_list.json");

//GET routes

// @route: GET api/request?number&abbreviated&user
// @access Public
// @desc:  Gets a request, optionally can have query strings
//     number (the number of requests you want to retrieve)
//     abbreviated (boolean flag to say only certain data)
//     user (requests made by a certain user)
// @requires: Request body is of the following format
//     {
//         queries: [{ status: String, state: String }]
//     }
// Must have a queries field, within query any objects must have status and state, status must be in a valid status state pair.
// @returns: A list of requests specified by the query string
//     [
//         {request A},
//         {request B},
//         ...
//     ]
// @throws: 400 if the statuses and states are invalid/not string/don't exist in the request body or url paramaters are weird

router.get( {

});


// @route: GET api/request/suggested?request_id
// @access: Private
// @desc: Gets a list of suggested tutors for a student
// @requirements: Must be in OPENED or CHECKING state
router.get( {

});


//POST routes

// @route: POST api/request/
// @access: Private
// @description: Student opens a requests
// @modifies: create the request
router.post( {

});


// @route: POST api/request/close?request_id
// @access: Private
// @description: Student finally closes the request after it has been rated
// @requirements: Request must have both student and tutor rating
// @modifies: Changes status close
router.post( {

});


// @route: POST api/request/ping?tutor_id&request_id
// @access: Private
// @description: Student opens a requests
// @modifies: Adds to the list of pinged tutors, changes to state to CHECKING
router.post( {

});


// @route: POST api/request/tutor/accept/?request_id
// @access: Private
// @description: Tutor chooses to accept a request that they were pinged for
// @modifies: Adds to the accepted tutors list
router.post( {

});


// @route: POST api/request/student/select?tutor_id
// @access: Private
// @description: Student selects a tutor to proceed with
// @modifies: Sets the selected tutor field, changes state to ASSIGNED
router.post( {

});


// @route: POST api/request/tutor/confirm?request_id
// @access: Private
// @description: Tutor does a final confirmation for if they would like to proceed with the request
// @modifies: State change to FULFILLED
router.post( {

});


// @route: POST api/request/tutor/rate?request_id
// @access: Private
// @description: Tutor rates a student
// @modifies: Adds a tutor rating
router.post( {

});


// @route: POST api/request/student/rate?request_id
// @access: Private
// @description: Student rates a tutor
// @modifies: Adds a student rating
router.post( {

});


//PUT routes

// @route: PUT api/request?request_id
// @access: Private
// @description: Student edits their request
// @requirements: Must be OPENED or CHECKING state, request_id must be a valid request in the DB
// @modifies: Alters the primary request data
router.put( {

});


//DELETE routes

// @route: DELETE api/request/tutor/deny?request_id
// @access: Private
// @description: Tutor denies an incoming request
// @modifies: Moving the tutor to the denied, removes from accepted tutors
router.delete( {

});


// @route: DELETE api/request/student/cancel?request_id
// @access: Private
// @description: Student moves from a state to a cancel state
// @modifies: Prepends 'CANCELLED' to the state
router.delete( {

});


// @route: DELETE api/request/tutor/cancel?request_id
// @access: Private
// @description: State transition for when the tutor chooses to cancel their acceptance
// @modifies: Sets the selected tutor feild to null, adds to cancelled tutor list, if tutor is cancelling accptence remove from accepted tutors list
router.delete( {

});


*/