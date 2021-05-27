const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const User = require('../../models/User');

//@route GET api/users

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 }),
        check('role', 'Role is required')
            .not()
            .isEmpty()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { name, role, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            // See if user exists
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Get user gravatar
            //without normalize
            const avatar = normalize(
                gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                }),
                { forceHttps: true }
            );

            user = new User({
                name,
                role,
                email,
                avatar,
                password
            });

            // Encrypt password by hashing
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();//save user in the data base

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
module.exports = router;