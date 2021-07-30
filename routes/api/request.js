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

// @route: POST api/request/
// @desc:  Post a request from a user
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("request", "request content is required").not().isEmpty(),
      check("course", "Related course is required").not().isEmpty(),
    ],
  ],

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
      number_sessions,
    } = req.body;
    const requestFields = {};
    requestFields.user = req.user.id;
    if (request) requestFields.request = request;
    if (course) requestFields.course = course;
    if (grade) requestFields.grade = grade;
    if (topic) requestFields.topic = topic;
    if (help_time) requestFields.help_time = help_time;
    if (availability) requestFields.availability = availability;
    if (number_sessions) requestFields.number_sessions = number_sessions;
    requestFields.potential_tutors = await getTutorMatches(
      req.body,
      req.user.id
    );

    try {
      const new_request = new Request(requestFields);
      await new_request.save();

      let requestByUser = await RequestRelate.findOne({ user: req.user.id });
      if (!requestByUser) {
        requestByUser = new RequestRelate({
          user: req.user.id,
          posted_requests: [{ _id: new_request._id }],
        });
      } else {
        if (requestByUser.posted_requests.length >= 3)
          return res.status(400).json({
            errors: [
              {
                msg: "User tried to exceed maximum of 3 concurrent requests for help.",
              },
            ],
          });

        requestByUser.posted_requests.push(new_request._id);
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

/*
// @route: GET api/request/
// @desc:  Get a list of all requests
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const reqs = await Request.find().sort({ date: -1 });
    res.json(reqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
*/

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
    const requestUser = await RequestRelate.findOne({ user: req.user.id });
    let reqs = [];

    if (!requestUser) {
      return res.json(reqs);
    }

    for (i = 0; i < requestUser.posted_requests.length; i++) {
      temp = await Request.findOne({
        _id: requestUser.posted_requests[i].id,
      });
      if (!temp) {
        return res.status(400).json({
          msg: `request of the _id ${requestUser.posted_requests[i].id} not found`,
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
    for (i = 0; i < Tutor.received_requests.length; i++) {
      //TODO: Ensure request ids are dispersed as mongo object ids
      temp = await Request.findOne({
        _id: Tutor.received_requests[i].id,
      });
      if (!temp) {
        return res.status(400).json({
          msg: `request of the _id ${Tutor.received_requests[i].id} not found`,
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

// @route: PUT api/request/edit/:request_id
// @desc:  Alters the users request by the request id
// @access Private
router.put("/edit/:request_id", auth, async (req, res) => {
  const {
    request,
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

// @route: POST api/request/disperse
// @desc:  Adds request id to each confirmed tutor's active_request
// @access Private
router.post("/disperse", auth, async (req, res) => {
  try {
    const tutor_ids = req.body.tutor_ids;
    const request_id = req.body.request_id;

    for (var i in tutor_ids) {
      const tutor_id = tutor_ids[i];
      var tutor = await RequestRelate.findOne({
        user: tutor_id,
      });
      if (!tutor) {
        console.log("new tutor");
        tutor = new RequestRelate({
          user: tutor_id,
          received_requests: [{ _id: request_id }],
        });
      } else {
        // Prevent multi sending
        if (
          JSON.stringify(tutor.received_requests).indexOf(
            JSON.stringify({ _id: request_id })
          ) === -1
        )
          tutor.received_requests.push(request_id);
      }
      await tutor.save();
    }
    res.json({
      tutors: tutor_ids,
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
    await Request.findOneAndRemove({ _id: req.params.request_id });
    const requestUser = await RequestRelate.findOne({ user: req.user.id });

    const removeIndex = requestUser.posted_requests
      .map((item) => item.id)
      .indexOf(req.params.request_id);

    requestUser.posted_requests.splice(removeIndex, 1);
    await requestUser.save();

    res.json(requestUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
