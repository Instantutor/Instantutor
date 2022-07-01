const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const partialMatch = require("../../utils/utilities");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Request = require("../../models/Request");
const checkObjectId = require("../../middleware/checkObjectId");
const RequestRelate = require("../../models/RequestRelate");

const courses = require("../../config/course_list.json");

// @route: GET api/profile/me
// @desc: Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "role",
      ["name", "avatar"]
    );

    // Show Error when empty profile!
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: POST api/profile
// @desc: Create/update user profile
// @access Public
router.post(
  "/",
  [
    auth,
    [
      check("degree", "Degree is required").not().isEmpty(),
      check("major", "Major is required").not().isEmpty(),
      check("role", "Role is required").not().isEmpty(),
      // check("expertise", "RPI subject and course for expertise items must be present to submit or resubmit")
      //   .custom(obj => 
      //       courses.subject_list.includes(obj.area) &&
      //       courses.course_list[obj.area].includes(obj.course)
      //     )
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      bio,
      degree,
      major,
      role,
      location,
      expertise,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile object, assign value to each property
    const profileFields = {};
    profileFields.user = req.user.id;
    if (degree) profileFields.degree = degree;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (role) profileFields.role = role;
    if (expertise) profileFields.expertise = expertise

    // Majors are input as a string, we need to seperate them into a array and delete useless ' '
    if (major) {
      profileFields.major = (major + "")
        .split(",")
        .map((major) => major.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findById(req.user.id);
      // Already have, update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      // var spawn = require("child_process").spawn;
      // const process = spawn("python", [".algos/SearchBar/Trie.py", user.name]);
      // process.on("exit", function (code, signal) {
      //   console.log(
      //     "child process exited with " + `code ${code} and signal ${signal}`
      //   );
      // });
      await profile.save(); //save it
      res.json(profile); //send back to the profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route: GET api/profile
// @desc:  Get all profile
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/profile/tutors
// @desc:  Get all tutors
// @access Public
router.get("/tutors", async (req, res) => {
  try {
    const tutors = await Profile.find({ role: {$in: ['Both','Tutor']}}).populate("user",["name","avatar"]);
    let data = [];
    for (var i = 0; i < tutors.length; i++){
      if (tutors[i].user?.name){
        let tutor = tutors[i].user;
        data.push({ tutor });
      }
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route: GET api/profile/names
// @desc:  Get all profile names
// @access Pubic
router.get("/names", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    console.log(profiles.map((profile) => profile.user.name));
    res.json(profiles.map((profile) => profile.user.name));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/profile/search?param1=text&param2=t
// @desc:  Get profile and filters by any number of params (all optional)
// @access Public
// Eg:     http://127.0.0.1:5000/api/profile/search?name=test
router.get("/search", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    // Filtering the profiles array
    const filtered = profiles.filter((profile) => {
      if (
        req.query.name &&
        (req.query.role == profile.role ||
          req.query.role == "" ||
          profile.role == "Both")
      ) {
        return partialMatch(profile.user.name, req.query.name);
      } else {
        return false;
      }
    });
    res.json(filtered);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET api/profile/user/user_id
// @desc:  Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({
        msg: "profile not found",
      });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route: DELETE api/profile
// @desc:  Delete user, profile and posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove posted requests
    while (await Request.findOneAndRemove({ user: req.user.id })) {
      continue;
    }
    await RequestRelate.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/profile/role
// @desc:  Add profile role
// @access Private
router.put(
  "/role",
  [auth, check("role", "Role is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role } = req.body;

    const newExp = {
      role,
    };

    // Get new role and put it into the array of role.
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.role.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route: DELETE api/profile/role/:exp:id
// @desc:  Delete an role by ID
// @access Private
router.delete("/role/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index of role we want to remove
    const removeIndex = profile.role
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.role.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/profile/experience
// @desc:  Add profile experience
// @access Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    // Get new experience and put it into the array of experience.
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route: DELETE api/profile/experience/:exp:id
// @desc:  Delete an experience by ID
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index of experience we want to remove
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/profile/education
// @desc:  Add profile education
// @access Private
router.put(
  "/education",
  [
    auth,
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),

    check("fieldofstudy", "Field of study is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    // Get new experience and put it into the array of experience.
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route: DELETE api/profile/experience/:exp:id
// @desc:  Delete an experience by ID
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index of experience we want to remove
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: DELETE api/profile/github/:username
// @desc:  Get user repos from Github
// @access Public
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${config.get("githubToken")}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

/*
// @route: GET api/profile/expertise/:username
// @desc: Get users which have certain expertise
// @access Public
router.get('')
*/

module.exports = router;
