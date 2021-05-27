const express = require('express');
const request = require('request')
const config = require('config')

const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route: GET api/profile/me
// @desc: Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            'role',
            ['name', 'avatar']
        );

        // Show Error when empty profile!
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});
// @route: POST api/profile
// @desc: Create/update user profile
// @access Public

router.post('/', [auth, [
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('major', 'Major is required')
        .not()
        .isEmpty(),
    check('role', 'Role is required')
        .not()
        .isEmpty(),
]],
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
            linkedin
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
            profileFields.major = (major + '').split(',').map(major => major.trim());
        }

        // Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

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
            await profile.save();//save it
            res.json(profile);//send back to the profile
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route: GET api/profile
// @desc:  Get all profile
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route: GET api/profile/user/user_id
// @desc:  Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile)
            return res.status(400).json({
                msg: "profile not found"
            })

        res.json(profile);
    }
    catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "profile not found" });
        }

        res.status(500).send('Server Error');
    }
})

// @route: DELETE api/profile
// @desc:  Delete user, profile and posts
// @access Private
router.delete('/', auth, async (req, res) => {
    try {

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted." });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route: PUT api/profile/role
// @desc:  Add profile role
// @access Private
router.put('/role', [auth,
    check('role', 'Role is required').not().isEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            role
        } = req.body;

        const newExp = {
            role
        }

        // Get new role and put it into the array of role.
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.role.unshift(newExp);

            await profile.save();

            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route: DELETE api/profile/role/:exp:id
// @desc:  Delete an role by ID
// @access Private
router.delete('/role/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of role we want to remove
        const removeIndex = profile.role
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        profile.role.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route: PUT api/profile/expertise
// @desc:  Add profile expertise
// @access Private
router.put('/expertise', [auth,
    check('area', 'Area is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('relatedCourses', 'Related courses are required').not().isEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            area,
            relatedCourses,
            description
        } = req.body;

        const newExp = {
            area,
            description
        }
        newExp.relatedCourses = (relatedCourses + '').split(',').map(relatedCourses => relatedCourses.trim());

        // Get new expertise and put it into the array of expertise.
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.expertise.unshift(newExp);

            await profile.save();

            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route: DELETE api/profile/expertise/:expertise:id
// @desc:  Delete an expertise by ID
// @access Private
router.delete('/expertise/:expertise_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of experience we want to remove
        const removeIndex = profile.expertise
            .map(item => item.id)
            .indexOf(req.params.expertise_id);

        profile.expertise.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route: PUT api/profile/experience
// @desc:  Add profile experience
// @access Private
router.put('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        // Get new experience and put it into the array of experience.
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route: DELETE api/profile/experience/:exp:id
// @desc:  Delete an experience by ID
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of experience we want to remove
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route: PUT api/profile/education
// @desc:  Add profile education
// @access Private
router.put('/education', [auth,
    check('school', 'School is required')
        .not().isEmpty(),
    check('degree', 'Degree is required')
        .not().isEmpty(),
    check('from', 'From date is required')
        .not().isEmpty(),

    check('fieldofstudy', 'Field of study is required')
        .not().isEmpty()

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        // Get new experience and put it into the array of experience.
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route: DELETE api/profile/experience/:exp:id
// @desc:  Delete an experience by ID
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of experience we want to remove
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route: DELETE api/profile/github/:username
// @desc:  Get user repos from Github
// @access Public
router.get('/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
        };

        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' });
    }
});

/*
// @route: GET api/profile/expertise/:username
// @desc: Get users which have certain expertise
// @access Public
router.get('')
*/

module.exports = router;