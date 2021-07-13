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

// @route: POST api/request/
// @desc:  Post a request from a user
// @access Private
router.post(
  "/",
  [auth, [check("request", "request content is required").not().isEmpty()]],

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
    if (request) requestFields.request = request;
    if (course) requestFields.course = course;
    if (grade) requestFields.grade = grade;
    if (topic) requestFields.topic = topic;
    if (help_time) requestFields.help_time = help_time;
    if (availability) requestFields.availability = availability;
    if (number_sessions) requestFields.number_sessions = number_sessions;
    requestFields.potential_tutors = await getTutorMatches(req.body);
    const requestByUser = await Request.findOne({ user: req.user.id });
    if (!requestByUser) {
      //initialize new set of requests for user

      const requestData = {};
      requestData.name = req.user.name;
      requestData.user = req.user.id;
      var requestArr = [];
      requestArr.push(requestFields);
      requestData.requests = requestArr;

      try {
        //Adds new request to requests collection
        let newRequest = new Request(requestData);
        await newRequest.save();
        console.log(
          "Requests for user initialized as user did not exists or had no active requests."
        );
        return res.json({
          msg: "Requests for user initialized.",
          new_request: newRequest.requests[0],
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    } else {
      try {
        if (requestByUser.requests.length < 3) {
          let originalRequests = await Request.findOneAndUpdate(
            { user: req.user.id },
            { $push: { requests: requestFields } }
          );
          res.json({
            msg: "Request added for user.",
            original_requests: originalRequests.requests,
            new_request: requestFields,
          });
        } else {
          //console.error("User cannot exceed maximum of 3 concurrent requests.");
          res.status(400).json({
            error:
              "User tried to exceed maximum of 3 concurrent requests for help.",
          });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error (adding)");
      }
    }
  }
);

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

// @route: GET api/request/:user_id
// @desc:  Get a list of all requests made by a certain user
// @access Private
router.get("/:user_id", auth, async (req, res) => {
  try {
    const reqs = await Request.find({ user: req.params.user_id }).sort({
      date: -1,
    });
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
    await Request.findOne({ user: req.user.id }).then((doc) => {
      let requestMatch = doc.requests.id(req.params.request_id);
      if (requestMatch) {
        if (request) requestMatch["request"] = request;
        if (course) requestMatch["course"] = course;
        if (grade) requestMatch["grade"] = grade;
        if (topic) requestMatch["topic"] = topic;
        if (help_time) requestMatch["help_time"] = help_time;
        if (availability) requestMatch["availability"] = availability;
        if (number_sessions) requestMatch["number_sessions"] = number_sessions;
        doc.save();

        res.json({ msg: "Request updated", updated_requests: requestMatch });
      } else {
        res.status(400).json({ error: "Request ID is invalid" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: DELETE api/request/edit/:request_id
// @desc:  Deletes a request made by a user
// @access Private
router.delete("/edit/:request_id", auth, async (req, res) => {
  try {
    await Request.findOne({ user: req.user.id }).then((doc) => {
      let requestMatch = doc.requests.id(req.params.request_id);

      if (requestMatch) {
        doc.requests = doc.requests.filter(
          (request) => request._id.toString() !== req.params.request_id
        );

        doc.save();
        res.json({ msg: "Request deleted", updated_requests: doc.requests });
      } else {
        res.status(400).json({ error: "Request ID is invalid" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
// @desc:  Deletes a bid may be user
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
module.exports = router;
