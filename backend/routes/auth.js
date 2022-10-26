const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

JWT_SECRET = 'aeroplaneshoe';

//ROUTE 1: create a user using: POST "/api/auth/createuser". No Login required

router.post('/createuser',
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {

        //if there are errors, return bad request along with the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //check whether the user with the same email exists already.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                let success = false
                return res.status(400).json({ success, error: "Sorry, a user with email already exists!" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            let success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Some error occured" });
            //   .then(user => res.json(user))
            //   .catch(err => {console.log(err)
            //   res.json({error: "Please enter unique value for email", message: err.message})});
        }


    });

//ROUTE 2: authenticate a user using: POST "/api/auth/login". No Login required

router.post('/login',
    body('email').isEmail(),
    body('password', 'password can not be blank').exists(),
    async (req, res) => {

        //if there are errors, return bad request along with the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //check whether the user with the same email exists already.
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials!" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                let success = false;
                return res.status(400).json({success, error: "Please try to login with correct credentials!" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            let success = true;
            res.json({ success, authtoken });

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server error");
        };
    });

//ROUTE 3: getting logged in user details using: POST "/api/auth/getuser".Login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;