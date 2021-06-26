const express = require("express");
const request = require("request");
const config = require("config");

const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Request = require("../../models/Request");
const User = require("../../models/User");
const { route } = require("./users");

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
          request: newRequest,
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
            "Original requests": originalRequests,
            newRequest: requestFields,
          });
        } else {
          console.error("User cannot exceed maximum of 3 concurrent requests.");
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

//List all current requests
router.get("/", auth, async (req, res) => {
  try {
    const reqs = await Request.find().sort({ date: -1 });
    res.json(reqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//List all current requests by certain user
router.get("/:user_id", auth, async (req, res) => {
  try {
    const reqs = await Request.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(reqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
