const express = require("express");
const request = require("request");
const config = require("config");
const getTutorMatches = require("../../utils/utilities").getTutorMatches;
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Request = require("../../models/Request");
const RequestRelate = require("../../models/RequestRelate");
const User = require("../../models/User");
const { route } = require("./users");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");

const courses = require("../../config/course_list.json");

// @route: POST api/request/
// @desc:  Post a request from a user
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("request", "request content is required").not().isEmpty(),
      check("subject").not().isEmpty().withMessage("Related subject is required").bail()
        .custom(subject => courses.subject_list.includes(subject))
        .withMessage("The subject chosen is not an RPI major"),
      check("course").not().isEmpty().withMessage("Related course is required").bail()
        .custom((course, { req }) => "subject" in req.body)
        .withMessage("Subject must be selected if you want to select a course").bail()
        .custom((course, { req }) => courses.subject_list.includes(req.body.subject))
        .withMessage("Subject must be valid if you want to select a course").bail()
        .custom((course, { req }) => courses.course_list[req.body.subject].includes(course))
        .withMessage("The course chose is not a valid RPI course"),
      check("number_sessions")
      .custom((number_sessions, { req }) => number_sessions > 0)
      .withMessage("Number of sessions must be greater than 0 and/or must be a value"),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      request,
      subject,
      course,
      grade,
      topic,
      help_time,
      availability,
      number_sessions,
    } = req.body;
    const requestFields = {};
    requestFields.user = req.user.id;
    requestFields.request = request;
    requestFields.subject = subject;
    requestFields.course = course;
    if (grade) requestFields.grade = grade;
    if (topic) requestFields.topic = topic;
    if (help_time) requestFields.help_time = help_time;
    if (availability) requestFields.availability = availability;
    if (number_sessions) requestFields.number_sessions = number_sessions;
    // Matching happens here
    requestFields.potential_tutors = await getTutorMatches(
      req.body,
      req.user.id
    );

    try {
      const new_request = new Request(requestFields);
      await new_request.save();

      let requestByUser = await RequestRelate.findOne({ user: req.user.id });
      if (!requestByUser) {
        // Create request relate
        requestByUser = new RequestRelate({
          user: req.user.id,
          active_requests: [{ _id: new_request._id }],
        });
      } else {
        //TODO: Only for those that are open => active_requests
        if (requestByUser.active_requests.length >= 3) {
          return res.status(400).json({
            errors: [
              {
                msg: "User tried to exceed maximum of 3 concurrent requests for help.",
              },
            ],
          });
        }

        requestByUser.active_requests.push(new_request._id);
      }
      await requestByUser.save();
      return res.json({
        requestByUser: requestByUser,
        new_request: new_request,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route: GET api/request
// @desc:  Get a list of all requests, optional query for status
// @access Public
// e.g. get api/request?status=open
router.get("/", async (req, res) => {
  try {
    var mongo_query = {}

    if (req.query.status)
      mongo_query = { status: req.query.status }
    
    // getting requests and limiting fields sent back
    const requests = await Request
      .find(mongo_query, { 
        potential_tutors: 0,
        bids: 0,
        tutor_rating: 0,
        status: 0,
        last_edit_time: 0,
        availability: 0})
      .sort({ date: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/requestID/:request_id", auth, async (req, res) => {
  //Get all requests for which tutor qualifies or has been chosen]
  /* Should consider simply adding a field in database for user
  that stores potential requests instead of performing all these
  searches.*/
  try {
    const request = await Request.findOne({
      _id: req.params.request_id,
    });

    if (!request)
      return res.status(400).json({
        msg: `request of the _id ${req.params.request_id} not found`,
      });

    res.json(request);
  } catch (err) {
    console.error("Error getting requests by ID", err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/request/:user_id
// @desc:  Get a list of all requests made by a certain user
// @access Private
router.get("/:user_id", auth, async (req, res) => {
  try {
    // Getting the requests made by a user
    const requestUser = await RequestRelate.findOne({ user: req.user.id });
    let reqs = [];

    if (!requestUser) {
      return res.json(reqs);
    }

    // get active requests
    for (i in requestUser.active_requests) {
      temp = await Request.findOne({
        _id: requestUser.active_requests[i].id,
      });
      if (!temp) {
        return res.status(400).json({
          msg: `request of the _id ${requestUser.active_requests[i].id} not found`,
        });
      }
      reqs.push(temp);
    }
    reqs.sort((a, b) => b.last_edit_time - a.last_edit_time);
    // get tutoring_requests
    for (i in requestUser.tutoring_requests) {
      temp = await Request.findOne({
        _id: requestUser.tutoring_requests[i].id,
      });
      if (!temp) {
        return res.status(400).json({
          msg: `request of the _id ${requestUser.tutoring_requests[i].id} not found`,
        });
      }
      reqs.push(temp);
    }
    // get closed requests
    for (i in requestUser.closed_requests) {
      temp = await Request.findOne({
        _id: requestUser.closed_requests[i].id,
      });
      if (!temp) {
        return res.status(400).json({
          msg: `request of the _id ${requestUser.closed_requests[i].id} not found`,
        });
      }
      reqs.push(temp);
    }
    res.json(reqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/request/received/:user_id
// @desc:  Get a list of all requests made by a certain user
// @access Private
router.get("/received/:user_id", auth, async (req, res) => {
  try {
    const Tutor = await RequestRelate.findOne({ user: req.user.id });
    let reqs = [];
    if (!Tutor) {
      return res.json(reqs);
    }

    // getting only recieved requests
    let num_new_request = 0;
    for (let i = 0; i < Tutor.received_requests.length; i++) {
      //TODO: Ensure request ids are dispersed as mongo object ids
      temp = await Request.findOne({
        _id: Tutor.received_requests[i].id,
      }).populate("user", ["id", "name"]);
      if (!temp) {
        continue;
        return res.status(400).json({
          msg: `request of the _id ${Tutor.received_requests[i].id} not found`,
        });
      }

      // Create a copy of the request. May be switch to hard-code version if this copy code has error.
      var copy = JSON.parse(JSON.stringify(temp));

      // Remove some unnessary information for user, add the tutor's response.
      //console.log(Tutor.received_requests[i]);
      copy.state = Tutor.received_requests[i].state
        ? Tutor.received_requests[i].state
        : "CHECKING";
      delete copy.potential_tutors;

      if (new Date(copy.last_edit_time) > new Date(Tutor.last_check_time)) {
        num_new_request += 1;
      }
      reqs.push(copy);
    }

    // Sort the peered requests such that the newest one be the first
    // reqs.sort((a, b)  => {b.last_edit_time <= a.last_edit_time});
    res.json({
      peer_requests: reqs,
      new_request: num_new_request,
      last_checked: Tutor.last_check_time,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/request/edit/:request_id
// @desc:  Alters the users request by the request id
// @access Private
router.put("/edit/:request_id",
  [
    auth,
    [
      check("subject")
        .custom(subject => subject ? courses.subject_list.includes(subject) : true)
        .withMessage("The subject chosen is not an RPI major")
        .custom((subject, { req }) => subject ? "course" in req.body : true)
        .withMessage("If you are changing the subject you must also change the course"),
      check("course")
        .custom((course, { req }) => "subject" in req.body)
        .withMessage("Subject must be included if you want to change the course").bail()
        .custom((course, { req }) => courses.subject_list.includes(req.body.subject))
        .withMessage("Subject must be valid if you want to change the course").bail()
        .custom((course, { req }) => course ?
          courses.course_list[req.body.subject].includes(course) : true)
        .withMessage("The course chosen is not a valid RPI course"),
      check("number_sessions")
      .custom((number_sessions, { req }) => number_sessions > 0)
      .withMessage("Number of sessions must be greater than 0 and/or must be a value"),
    ],
  ]

  , async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      request,
      subject,
      course,
      grade,
      topic,
      help_time,
      availability,
      number_sessions,
    } = req.body;

    try {
      requestMatch = await Request.findOne({ _id: req.params.request_id });
      if (requestMatch) {
        if (request) requestMatch["request"] = request;
        if (subject) requestMatch["subject"] = subject;
        if (course) requestMatch["course"] = course;
        if (grade) requestMatch["grade"] = grade;
        if (topic) requestMatch["topic"] = topic;
        if (help_time) requestMatch["help_time"] = help_time;
        if (availability) requestMatch["availability"] = availability;
        if (number_sessions) requestMatch["number_sessions"] = number_sessions;
        requestMatch["last_edit_time"] = Date.now();
        requestMatch.save();

        res.json({ msg: "Request updated", updated_request: requestMatch });
      } else {
        res.status(400).json({ error: "Request ID is invalid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// @route: PUT api/request/add_potential/:request_id
// @desc:  Adds a tutor to the list of potential tutors for a request
// @access Private
router.put("/add_potential/:request_id", auth, async(req, res) => {
    try {
      requestMatch = await Request.findOne({ _id: req.params.request_id });
      
      // error checking
      if (req.user.id == requestMatch.user) {
        return res.status(400).json({ "msg": "User can not add self to tutor list" })
      } else if (requestMatch.potential_tutors.find(
        tutor => tutor._id == req.user.id
      )) {
        return res.status(400).json({ "msg": "User already in the potential tutor list" })
      }

      // find profile and add tutor
      const profile = await Profile.findOne({ "user": req.user.id }).populate("user", ["name", "avatar"])
      requestMatch.potential_tutors.push({ 
        _id : profile.user._id,
        name: profile.user.name,
        avatar: profile.user.avatar,
        state: 'UNSEND'})
      requestMatch.save()

      res.json({ 
        "msg": "Success user added as a potential tutor",
        updated_request: requestMatch })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
})

// @route: POST api/request/disperse
// @desc:  Adds request id to each confirmed tutor's active_request
// @access Private
router.post("/disperse", auth, async (req, res) => {
  try {
    //TODO: tutor_ids now an object {id: bool}
    const tutor_choices = req.body.tutor_ids;
    const request_id = req.body.request_id;
    for (const [tutor_id, wasConfirmed] of Object.entries(tutor_choices)) {
      var tutor = await RequestRelate.findOne({
        user: tutor_id,
      });
      if (!tutor && wasConfirmed) {
        console.log("new tutor");
        tutor = new RequestRelate({
          user: tutor_id,
          received_requests: [{ _id: request_id }],
        });
      } else {
        // Prevent multi sending
        const index = tutor.received_requests.findIndex(
          (item) => item._id == request_id
        );
        if (index < 0 && wasConfirmed) {
          tutor.received_requests.push(request_id);
          //change state in potential tutors
          var request = await Request.findOne({ _id: request_id });
          const index = request.potential_tutors.findIndex(
            (item) => item._id == tutor_id
          );
          request.potential_tutors[index].state = "CHECKING";
          await request.save();
        } else if (index > -1 && !wasConfirmed) {
          tutor.received_requests.splice(index, 1);
          var request = await Request.findOne({
            potential_tutors: { $elemMatch: { _id: tutor_id } },
          });
          const index = request.potential_tutors.findIndex(
            (item) => item._id == tutor_id
          );
          request.potential_tutors[index].state = "UNSEND";
          await request.save();
        }
      }
      await tutor.save();
    }
    res.json({
      tutor_statuses: tutor_choices,
      request: request_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
router.post("/disperseFinal", auth, async (req, res) => {
  try {
    const tutor_id = req.body.tutor_id;
    const request_id = req.body.request_id;

    const request = await Request.findOne({ _id: request_id });
    request.status = "tutoring";
    //also need ot make state of potnetial_tutor == selected
    const tutor_index = request.potential_tutors.findIndex(
      (item) => item._id == tutor_id
    );
    request.potential_tutors[tutor_index].state = "SELECTED";
    request.selected_tutor = tutor_id;
    await request.save();
    const requestByUser = await RequestRelate.findOne({ user: request.user });
    const removeIndex = requestByUser.active_requests.findIndex(
      (item) => item._id == request_id
    );
    if (removeIndex > -1) {
      requestByUser.active_requests.splice(removeIndex, 1);
    }
    requestByUser.tutoring_requests.push(request_id);
    await requestByUser.save();
    res.json({
      tutor: tutor_id,
      request: request_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route: DELETE api/request/delete/:request_id
// @desc:  Deletes a request made by a user
// @access Private
router.delete("/delete/:request_id", auth, async (req, res) => {
  try {
    // Make sure that this is actually deleted
    const deleted_request = await Request.findOneAndRemove({ _id: req.params.request_id });
    const requestUser = await RequestRelate.findOne({ user: req.user.id });
    //need to remove this request from all tutors received_request
    const removeIndex = requestUser.active_requests
      .map((item) => item.id)
      .indexOf(req.params.request_id);

    if (removeIndex > -1) {
      requestUser.active_requests.splice(removeIndex, 1);
    }
    await requestUser.save();
    const tutorsWithRequest = await RequestRelate.find({
      received_requests: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(req.params.request_id),
        },
      },
    });
    for (var i in tutorsWithRequest) {
      const tutor = tutorsWithRequest[i];
      const index = tutor.received_requests
        .map((item) => item._id)
        .indexOf(req.params.request_id);
      tutor.received_requests.splice(index, 1);
      await RequestRelate.findOneAndUpdate(
        { _id: tutor._id },
        { $set: { received_requests: tutor.received_requests } }
      );
    }
    return res.json({
      requestByUser: requestUser,
      deleted_request: deleted_request,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/request/cancel/:request_id
// @desc:  Update the last check time when a user check his peer requests.
// @access Private
router.put("/cancel/:request_id", auth, async (req, res) => {
  //cancel a request that has active instruction
  try {
    const request_id = req.params.request_id;
    var request = await Request.findOne({ _id: request_id });
    if (!request) {
      res.status(404).json({ error: { msg: "No request found with that id." } });
    }
    request.status = "canceled";
    await request.save();
    //remove from active_requests if present
    var requestByUser = await RequestRelate.findOne({ user: request.user });
    const removeIndex = requestByUser.tutoring_requests.findIndex(
      (item) => item._id == request_id
    );
    if (removeIndex > -1) {
      requestByUser.tutoring_requests.splice(removeIndex, 1);
    }
    requestByUser.closed_requests.push(request_id);
    await requestByUser.save();
    res.json({ msg: `Request ${request_id} has been canceled successfully.` });
  } catch (err) {
    console.error("Error canceling request: ", err.message);
    res.status(500).send("Server error");
  }

  //remove request from tutors received requests
});

// @route: PUT api/request/rate_tutor/:request_id
// @desc:  Adds a rating to a request from the student side
// @access Private
router.put("/rate_tutor/:request_id", auth, async (req, res) => {
  const {
    rating
  } = req.body;

  try {
    // Changing the request status
    const request_id = req.params.request_id;
    var request = await Request.findOne({ _id: request_id });
    if (!request) {
      res.status(404).json({ error: { msg: "No request found with that id." } });
    }
    request.status = "rated";
    request.tutor_rating = rating;
    await request.save();
    // Adding rating to request relate
    requestMatch = await RequestRelate.findOne({ user: request.user });
    if (requestMatch) {
      if (rating) {
        const rateIndex = requestMatch.closed_requests.findIndex(
          request => request._id == request_id);
        if (rateIndex != -1)
          requestMatch.closed_requests[rateIndex].tutor_rating = req.body.rating;
          requestMatch.closed_requests[rateIndex].state = "RATED";
      }
      requestMatch.save();

      res.json({ msg: "Tutor rating added" });
    } else {
      res.status(400).json({ error: "Request ID is invalid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route: PUT api/request/rate_student/:request_id
// @desc:  Adds a rating to a request from the tutor side
// @access Private
router.put("/rate_student/:request_id", auth, async (req, res) => {
  //add rating from tutor to student
  /*const {
    rating
  } = req.body;

  try {
    // Changing the request status
    const request_id = req.params.request_id;
    var request = await Request.findOne({ _id: request_id });
    if (!request) {
      res.status(404).json({ error: { msg: "No request found with that id." } });
    }
    request.status = "rated";
    request.student_rating = rating;
    await request.save();
    // Adding rating to request relate
    requestMatch = await RequestRelate.findOne({ user: request.user });
    if (requestMatch) {
      if (rating) {
        const rateIndex = requestMatch.closed_requests.findIndex(
          request => request._id == request_id);
        if (rateIndex != -1)
          requestMatch.closed_requests[rateIndex].student_rating = req.body.rating;
      }
      requestMatch.save();

      res.json({ msg: "Student rating added" });
    } else {
      res.status(400).json({ error: "Request ID is invalid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }*/

  const {
    rating
  } = req.body;

  try {
    const request_id = req.params.request_id;
    var request = await Request.findOne({ _id: request_id });
    if (!request) {
      res.status(404).json({ error: { msg: "No request found with that id." } });
    }

    var requestMatch = await RequestRelate.findOne({ user: request.user });

    if (requestMatch) {
      if (rating) {
        const rateIndex = requestMatch.closed_requests.findIndex(
          request => request._id == request_id);
        if (rateIndex != -1) {
          requestMatch.closed_requests[rateIndex].student_rating = rating;
          requestMatch.closed_requests[rateIndex].state = "RATED";
        }
      }
      requestMatch.save();

      res.json({ msg: "Student rating added" });
    } else {
      res.status(400).json({ error: "Request ID is invalid" });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/request/close/:request_id
// @desc:  Update the last check time when a user check his peer requests.
// @access Private
router.put("/close/:request_id", auth, async (req, res) => {
  // const {
  //   rating
  // } = req.body;

  //close a request that has active instruction
  try {
    const request_id = req.params.request_id;
    var request = await Request.findOne({ _id: request_id });
    if (!request) {
      res.status(404).json({ error: { msg: "No request found with that id." } });
    }
    request.status = "closed";
    // if (rating) requestMatch["rating"].push({stars: rating});
    await request.save();
    //remove from active_requests if present
    var requestByUser = await RequestRelate.findOne({ user: request.user });
    // console.log(requestByUser);
    const removeIndex = requestByUser.tutoring_requests.findIndex(
      (item) => item._id == request_id
    );
    // console.log(removeIndex);
    if (removeIndex > -1) {
      requestByUser.tutoring_requests.splice(removeIndex, 1);
    }
    // console.log(requestbyUser);
    requestByUser.closed_requests.push(request_id);
    // console.log(requestbyUser);
    await requestByUser.save();
    res.json({ msg: `Request ${request_id} has been closed successfully.` });
  } catch (err) {
    console.error("Error closing request: ", err.message);
    res.status(500).send("Server error");
  }

  //remove request from tutors received requests
});

// @route: PUT api/request/checked
// @desc:  Update the last check time when a user check his peer requests.
// @access Private
router.put("/checked", auth, async (req, res) => {
  try {
    const requestUser = await RequestRelate.findOne({ user: req.user.id });

    if (requestUser) {
      if (req.body.last_check_time) {
        requestUser.last_check_time = req.body.last_check_time;
      } else {
        requestUser.last_check_time = Date.now();
      }
      requestUser.save();

      res.json({
        msg: "Request check time updated!",
        last_check_time: requestUser.last_check_time,
      });
    } else {
      res.status(400).json({ error: "User ID is invalid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/request/tutor/response
// @desc:  Update tutor's response about one request: Accept or Deny
// @access Private
router.put("/tutor/response", auth, async (req, res) => {
  try {
    const requestUser = await RequestRelate.findOne({ user: req.user.id });
    const request = await Request.findOne({ _id: req.body._id });

    if (requestUser && req.body.response && req.body._id) {
      console.log(req.body._id);
      // Update the tutor's request-relate information
      let updateIndex = requestUser.received_requests.findIndex(
        (item) => item._id == req.body._id
      );
      requestUser.received_requests[updateIndex].state = req.body.response;
      requestUser.save();

      // Update the request information
      updateIndex = request.potential_tutors.findIndex(
        (item) => item._id == req.user.id
      );

      request.potential_tutors[updateIndex].state = req.body.response;
      request.save();

      res.json({
        msg: "Tutor response saved!",
        request: request,
        response: request.potential_tutors[updateIndex].state,
      });
    } else {
      res.status(400).json({
        error:
          "Tutor/Response: tutor not find or input incorrect: usage {response, _id}",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/request/confirmedTutors/
// @desc:  Get all tutors to whom this request has been sent
// @access Private

router.post("/tutors/confirmed", auth, async (req, res) => {
  const request_ids = req.body.request_ids;
  var requestsToConfirmedTutors = {};
  try {
    for (var i in request_ids) {
      const request_id = request_ids[i];
      const tutorsSelectedForRequest = await RequestRelate.find(
        {
          received_requests: {
            $elemMatch: { _id: mongoose.Types.ObjectId(request_id) },
          },
        },
        { user: 1 }
      );
      var confirmed_tutors = [];
      if (!tutorsSelectedForRequest) {
        return res.json(confirmed_tutors);
      }
      for (var i in tutorsSelectedForRequest) {
        confirmed_tutors.push(tutorsSelectedForRequest[i].user);
      }
      requestsToConfirmedTutors[request_id] = confirmed_tutors;
    }
    res.json(requestsToConfirmedTutors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*router for google calendar integration

router.post("/google/get", async (req, res, next) => {
 const {
    google
 } = require('googleapis')
 const {
    addWeeks
 } = require('date-fns')
 const {
    OAuth2
 } = google.auth
 const oAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
 )
 oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
 })

 const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
 })
});*/
/* Need renew
// @route: PUT api/request/bid
// @desc:  A user can bid, adding to the bids array
// @access Private
router.put(
  "/bid",
  [
    auth,
    [
      check("peer_id", "Bid must include the ID of the request maker")
        .not()
        .isEmpty(),
      check(
        "request_id",
        "Bid must include the ID of the request you are bidding for"
      )
        .not()
        .isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { peer_id, request_id, fee } = req.body;
    const bidFields = {};
    if (fee) bidFields.fee = fee;

    if (peer_id === req.user.id)
      return res
        .status(403)
        .json({ error: "User can not bid on their own request" });

    try {
      await Request.findOne({ user: peer_id }).then((doc) => {
        let requestMatch = doc.requests.id(request_id);

        if (requestMatch) {
          let bidMatch = requestMatch.bids.find(
            (bid) => bid.bidder_id === req.user.id
          );

          if (bidMatch)
            for (const prop in bidFields) bidMatch[prop] = bidFields[prop];
          else requestMatch.bids.push({ bidder_id: req.user.id, ...bidFields });

          doc.save();
          res.json({
            msg: "Bid made",
            bid: { bidder_id: req.user.id, ...bidFields },
          });
        } else {
          res.status(400).json({ error: "Request ID is invalid" });
        }
      });
    } catch (err) {
      if (err.kind === "ObjectId")
        res.status(400).json({ error: "Peer ID is invalid" });
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route: DELETE api/request/bid
// @desc:  Deletes a bid made by a user
// @access Private
router.delete(
  "/bid",
  [
    auth,
    [
      check("peer_id", "Peer ID must be included in the body").not().isEmpty(),
      check("request_id", "ID of bid up for deltion must be in the body")
        .not()
        .isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { peer_id, request_id } = req.body;

    try {
      await Request.findOne({ user: peer_id }).then((doc) => {
        let requestMatch = doc.requests.id(request_id);

        if (requestMatch) {
          let bidMatch = requestMatch.bids.find(
            (bid) => bid.bidder_id === req.user.id
          );

          if (bidMatch)
            requestMatch.bids = requestMatch.bids.filter(
              (bid) => bid.bidder_id.toString() !== req.user.id
            );
          else
            res
              .status(403)
              .json({ error: "You have not placed any bids on this request" });

          doc.save();
          res.json({ msg: "Request deleted", updated_bids: requestMatch.bids });
        } else {
          res.status(400).json({ error: "Request ID is invalid" });
        }
      });
    } catch (err) {
      if (err.kind === "ObjectId")
        res.status(400).json({ error: "Peer ID is invalid" });
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);
*/

module.exports = router;
