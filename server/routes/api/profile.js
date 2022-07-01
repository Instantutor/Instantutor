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

/**
 * @route GET api/profile
 * @desc:  Get all profiles with optional parameters to make output short,
 * get the first output, and any additional queries
 * @access Public
 * e.g. get api/profile?role=tutor&short=t&single=t
 */
router.get("/", async (req, res) => {
  try {
    // Deciding and executing the query
    var mongo_query = {}

    if (req.query.role) {
      if (req.query.role == "Tutor") mongo_query.role = {$in: ['Both','Tutor']}
      else if (req.query.role == "Student") mongo_query.role = {$in: ['Both','Student']}
      else if (req.query.role == "Both") mongo_query.role = {$in: ['Both']}
    }

    // console.log(req.query)

    for (property in req.query) {
      if (property != "role" && property != "short" && property != "single") {
        mongo_query[property] = req.query[property]
        console.log(mongo_query)
      }
    }

    var profiles = await Profile.find(mongo_query).populate("user", ["name", "avatar"]);

    // additional optons
    if (req.query.short && req.query.short == 't')
      profiles = profiles.map(profile => profile.user)
    if (req.query.single && req.query.single == 't')
      profiles = profiles[0]

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

    // Get new role and change old
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //profile.role.unshift(newExp);
      profile.role = role;

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
    check("area").not().isEmpty().withMessage("Area is required").bail()
      .custom(area => courses.subject_list.includes(area))
      .withMessage("The subject chosen is not an RPI major"),
    check("degree", "Degree is required").not().isEmpty(),
    check("relatedCourses").not().isEmpty().withMessage("Related courses are required").bail()
      .custom((relatedCourses, {req}) =>  "area" in req.body)
      .withMessage("Area must be selected if you want to select a course").bail()
      .custom((relatedCourses, {req}) => courses.subject_list.includes(req.body.area))
      .withMessage("Subject must be valid if you want to select a course").bail()
      .custom((relatedCourses, {req}) => {
        if (!relatedCourses) return true;
        return relatedCourses.every(course => courses.course_list[req.body.area].includes(course));
      })
      .withMessage("The course chose is not a valid RPI course"),
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
    newExp.relatedCourses = relatedCourses

    // Get new expertise and put it into the array of expertise.
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //if area exists in profile.expertise, update its info
      const index = profile.expertise.findIndex( exp => exp.area == newExp.area);
      if (index > -1) {
        profile.expertise[index].degree = newExp.degree;
        profile.expertise[index].description = newExp.description;
        //loop through related courses and add them to the array
        for (let i = 0; i < newExp.relatedCourses.length; i++) {
          if (!profile.expertise[index].relatedCourses.includes(newExp.relatedCourses[i])) {
            profile.expertise[index].relatedCourses.push(newExp.relatedCourses[i]);
          }
        }
      }
      //else, add it to the array
      else {
        profile.expertise.unshift(newExp);
      }

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
    const profile = await Profile.findOne({ user: req.user.id });

    const expertiseIndex = profile.expertise
      .map((item) => item.id)
      .indexOf(req.params.expertise_id);

    if (expertiseIndex === -1) {
      throw { message: "Invalid expertise_id" };
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
    check("area").not().isEmpty().withMessage("Area is required").bail()
      .custom(subject => subject ? courses.subject_list.includes(subject) : true)
      .withMessage("The area chosen is not an RPI major")
      .custom((subject, {req}) => subject ? "relatedCourses" in req.body : true)
      .withMessage("If you are changing the area you must also change the course"),
    check("degree", "Degree is required").not().isEmpty(),
    check("relatedCourses").not().isEmpty().withMessage("Related courses are required").bail()
      .custom((relatedCourses, {req}) =>  "area" in req.body)
      .withMessage("Area must be included if you want to change the course").bail()
      .custom((relatedCourses, {req}) => courses.subject_list.includes(req.body.area))
      .withMessage("Area must be valid if you want to change the course").bail()
      .custom((relatedCourses, {req}) => {
        if (!relatedCourses) return true;
        return relatedCourses.every(course => courses.course_list[req.body.area].includes(course));
      })
      .withMessage("The course chosen is not a valid RPI course"),
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
      updatedExp.relatedCourses = relatedCourses;

      const profile = await Profile.findOne({ user: req.user.id });

      // Get the index of experience we want to update
      const updateIndex = profile.expertise
        .map((item) => item.id)
        .indexOf(req.params.expertise_id);

      //if area exists in profile.expertise, update its info
      const index = profile.expertise.findIndex( exp => exp.area == updatedExp.area);
      if (index > -1) {
        profile.expertise[index].degree = updatedExp.degree;
        profile.expertise[index].description = updatedExp.description;
        //loop through related courses and add them to the array
        for (let i = 0; i < relatedCourses.length; i++) {
          if (!profile.expertise[index].relatedCourses.includes(relatedCourses[i])) {
            profile.expertise[index].relatedCourses.push(relatedCourses[i]);
          }
        }
      }
      //else, add it to the array
      else {
        profile.expertise[updateIndex] = updatedExp;
      }

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

/*
// @route: GET api/profile/expertise/:username
// @desc: Get users which have certain expertise
// @access Public
router.get('')
*/

module.exports = router;
