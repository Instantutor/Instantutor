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
      await profile.save(); //save it
      var spawn = require("child_process").spawn;
      const process = spawn("python3", [".algos/SearchBar/Trie.py", user.name]);
      process.on("exit", function (code, signal) {
        console.log(
          "child process exited with " + `code ${code} and signal ${signal}`
        );
      });
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

// @route: GET api/profile/names
// @desc:  Get all profile names
// @access Pubic
router.get("/names", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    console.log(profiles);
    res.json(profiles);
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
    await Request.findOneAndRemove({ user: req.user.id });

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

// @route: PUT api/profile/expertise
// @desc:  Add profile expertise
// @access Private
router.put(
  "/expertise",
  [
    auth,
    check("area", "Area is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("relatedCourses", "Related courses are required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { area, degree, relatedCourses, description } = req.body;

    const newExp = {
      area,
      degree,
      description,
    };
    newExp.relatedCourses = (relatedCourses + "")
      .split(",")
      .map((relatedCourses) => relatedCourses.trim());

    // Get new expertise and put it into the array of expertise.
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.expertise.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route: GET api/profile/expertise/:expertise_id
// @desc:  Get expertise by its id
// @access private
router.get("/expertise/:expertise_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    
    const expertiseIndex = profile.expertise
      .map((item) => item.id)
      .indexOf(req.params.expertise_id);

    if (expertiseIndex === -1){
      throw({message : "Invalid expertise_id"});
    }

    res.json(profile.expertise[expertiseIndex]);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: PUT api/profile/expertise/:expertise_id
// @desc:  Update profile expertise
// @access Private
router.put(
  "/expertise/:expertise_id",
  [
    auth,
    check("area", "Area is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("relatedCourses", "Related courses are required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { area, degree, relatedCourses, description } = req.body;

      const updatedExp = {
        area,
        degree,
        description,
      };
      updatedExp.relatedCourses = (relatedCourses + "")
        .split(",")
        .map((relatedCourses) => relatedCourses.trim());

      const profile = await Profile.findOne({ user: req.user.id });
  
      // Get the index of experience we want to update
      const updateIndex = profile.expertise
        .map((item) => item.id)
        .indexOf(req.params.expertise_id);
  
      profile.expertise[updateIndex] = updatedExp;
  
      await profile.save();
  
      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route: DELETE api/profile/expertise/:expertise:id
// @desc:  Delete an expertise by ID
// @access Private
router.delete("/expertise/:expertise_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the index of experience we want to remove
    const removeIndex = profile.expertise
      .map((item) => item.id)
      .indexOf(req.params.expertise_id);

    profile.expertise.splice(removeIndex, 1);

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

router.get("/tutor/requests", auth, async (req, res) => {
  //Get all requests for which tutor qualifies or has been chosen]
  /* Should consider simply adding a field in database for user 
  that stores potential requests instead of performing all these
  searches.*/
  try {
    var currentUser = await Profile.findOne({ user: req.user.id });
    if (currentUser.role == "Student") {
      throw Error("User must have Tutor role.");
    }
    var matchingRequests = await Request.find({
      requests: {
        $elemMatch: {
          potential_tutors: mongoose.Types.ObjectId(req.user.id),
        },
      },
    });
    var tutorRequests = [];
    for (var i in matchingRequests) {
      var userRequests = matchingRequests[i]["requests"];
      for (var j in userRequests) {
        if (userRequests[j]["potential_tutors"].includes(req.user.id)) {
          const matchingRequest = userRequests[j];
          delete matchingRequest.potential_tutors;
          tutorRequests.push(matchingRequest);
        }
      }
    }
    res.json({ matching_requests: tutorRequests });
  } catch (err) {
    console.error("Error getting tutor requests:", err.message);
    res.status(500).send("Server Error");
  }
});

/*
// @route: GET api/profile/expertise/:username
// @desc: Get users which have certain expertise
// @access Public
router.get('')
*/

module.exports = router;
