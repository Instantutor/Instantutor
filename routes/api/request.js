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
    //Upper Bound Request Checking...
    try {
      var user = await User.findOne({ _id: req.user.id });
      //check if user exists
      if (user != null) {
        if (user.currentRequests < 5) {
          user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $inc: { currentRequests: 1 } },
            { new: true }
          );
          user.save();
        } else {
          console.error(
            "User cannot submit more than 5 concurrent requests for help."
          );
          return res.json({
            msg: "User may only have 5 concurrent requests for help out at the same time.",
          });
        }
      } else {
        console.error("User does not exist");
        return res.status(404).json({ error: "User does not exist" });
      }
    } catch (err) {
      console.error("Server error", err);
      return res.status(400).json({ msg: "Could not increment requests." });
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
    requestFields.name = req.user.name;
    requestFields.user = req.user.id;
    if (request) requestFields.request = request;
    if (course) requestFields.course = course;
    if (grade) requestFields.grade = grade;
    if (topic) requestFields.topic = topic;
    if (help_time) requestFields.help_time = help_time;
    if (availability) requestFields.availability = availability;
    if (number_sessions) requestFields.number_sessions = number_sessions;

    try {
      //Adds new request to requests collection
      let newRequest = new Request(requestFields);
      await newRequest.save();
      return res.json({ msg: "Request added.", request: newRequest });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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
